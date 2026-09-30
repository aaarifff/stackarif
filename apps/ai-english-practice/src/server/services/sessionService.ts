import { and, asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { messages, practiceSessions, reviews, suggestionSets, turnRequests } from "@/db/schema";
import { SCENARIOS } from "@/content/scenarios";
import { resolveScenarioForUser } from "@/server/scenarios/resolve";
import { generateReview, generateTurn, type HistoryTurn } from "@/server/ai/gemini";
import { reserveAiRequest } from "@/server/usage";
import type { Difficulty, Personality } from "@/lib/types";

export class NotFoundError extends Error {}
export class ForbiddenError extends Error {}
export class ValidationError extends Error {}

async function requireOwnedSession(sessionId: string, userId: string) {
  const rows = await db
    .select()
    .from(practiceSessions)
    .where(eq(practiceSessions.id, sessionId))
    .limit(1);
  const session = rows[0];
  if (!session) throw new NotFoundError("Session not found");
  if (session.userId !== userId) throw new ForbiddenError("Not your session");
  return session;
}

async function getMessageHistory(sessionId: string): Promise<HistoryTurn[]> {
  const rows = await db
    .select()
    .from(messages)
    .where(eq(messages.sessionId, sessionId))
    .orderBy(asc(messages.turnIndex));
  return rows.map((m) => ({ role: m.role as "client" | "user", text: m.submittedText }));
}

async function persistSuggestions(
  sessionId: string,
  clientMessageId: string,
  suggestions: Awaited<ReturnType<typeof generateTurn>>["suggestions"],
) {
  const direct = suggestions.find((s) => s.kind === "direct")!;
  const clarify = suggestions.find((s) => s.kind === "clarify")!;
  const nextStep = suggestions.find((s) => s.kind === "next_step")!;

  const [row] = await db
    .insert(suggestionSets)
    .values({
      sessionId,
      clientMessageId,
      directText: direct.text,
      directWhy: direct.why,
      directBn: direct.meaningBn ?? null,
      clarifyText: clarify.text,
      clarifyWhy: clarify.why,
      clarifyBn: clarify.meaningBn ?? null,
      nextStepText: nextStep.text,
      nextStepWhy: nextStep.why,
      nextStepBn: nextStep.meaningBn ?? null,
    })
    .returning();
  return row;
}

export async function createPracticeSession(params: {
  userId: string;
  scenarioId: string;
  difficulty: Difficulty;
  personality: Personality;
  explanationLanguage: "none" | "bn";
}) {
  const scenario = await resolveScenarioForUser(params.userId, params.scenarioId);
  if (!scenario) throw new NotFoundError("Scenario not found");

  await reserveAiRequest(params.userId);

  const [session] = await db
    .insert(practiceSessions)
    .values({
      userId: params.userId,
      scenarioId: scenario.id,
      scenarioVersion: scenario.version,
      difficulty: params.difficulty,
      personality: params.personality,
      explanationLanguage: params.explanationLanguage,
      status: "active",
      turnCount: 0,
    })
    .returning();

  let generated;
  try {
    generated = await generateTurn({
      scenario,
      difficulty: params.difficulty,
      personality: params.personality,
      explanationLanguage: params.explanationLanguage,
      history: [],
      learnerMessage: null,
    });
  } catch (err) {
    console.error("[sessionService] Opening turn generation failed; using fallback:", err);
    generated = {
      clientMessage: scenario.openingMessage,
      suggestions: [
        { kind: "direct" as const, text: "Thanks for sharing that. Let me ask a few questions first.", why: "A safe opener while ideas reload.", meaningBn: null },
        { kind: "clarify" as const, text: "Could you tell me a bit more about what you need?", why: "Buys time to gather details.", meaningBn: null },
        { kind: "next_step" as const, text: "Let's list your main requirements before anything else.", why: "Moves the conversation forward.", meaningBn: null },
      ],
      objectiveUpdates: [],
      sessionCompleteSuggested: false,
    };
  }

  const [clientMessage] = await db
    .insert(messages)
    .values({
      sessionId: session.id,
      turnIndex: 0,
      role: "client",
      submittedText: generated.clientMessage,
      inputMode: "text",
    })
    .returning();

  const suggestions = await persistSuggestions(session.id, clientMessage.id, generated.suggestions);

  await db
    .update(practiceSessions)
    .set({ turnCount: 1 })
    .where(eq(practiceSessions.id, session.id));

  return { session, clientMessage, suggestions, objectiveUpdates: generated.objectiveUpdates };
}

export async function getFullSession(sessionId: string, userId: string) {
  const session = await requireOwnedSession(sessionId, userId);
  const scenario = await resolveScenarioForUser(userId, session.scenarioId);
  const msgRows = await db
    .select()
    .from(messages)
    .where(eq(messages.sessionId, sessionId))
    .orderBy(asc(messages.turnIndex));

  const suggestionRows = await db
    .select()
    .from(suggestionSets)
    .where(eq(suggestionSets.sessionId, sessionId));

  const suggestionsByMessage = new Map(suggestionRows.map((s) => [s.clientMessageId, s]));

  const reviewRows = await db.select().from(reviews).where(eq(reviews.sessionId, sessionId)).limit(1);

  return {
    session,
    scenario,
    messages: msgRows.map((m) => ({
      ...m,
      suggestions: m.role === "client" ? suggestionsByMessage.get(m.id) ?? null : null,
    })),
    review: reviewRows[0] ?? null,
  };
}

export async function submitTurn(params: {
  userId: string;
  sessionId: string;
  clientRequestId: string;
  text: string;
  inputMode: "text" | "voice";
  rawTranscript: string | null;
  edited: boolean;
  assisted: boolean;
  usedSuggestionKind: string | null;
  audioDurationMs: number | null;
}) {
  const session = await requireOwnedSession(params.sessionId, params.userId);
  if (session.status !== "active") {
    throw new ValidationError("This session has already ended.");
  }
  if (params.text.length === 0 || params.text.length > 2000) {
    throw new ValidationError("Message must be between 1 and 2000 characters.");
  }

  const existingRequest = await db
    .select()
    .from(turnRequests)
    .where(and(eq(turnRequests.sessionId, params.sessionId), eq(turnRequests.clientRequestId, params.clientRequestId)))
    .limit(1);

  if (existingRequest.length > 0 && existingRequest[0].clientMessageId) {
    return getFullSession(params.sessionId, params.userId);
  }

  const scenario = await resolveScenarioForUser(params.userId, session.scenarioId);
  if (!scenario) throw new NotFoundError("Scenario content missing");

  const history = await getMessageHistory(params.sessionId);
  const nextUserIndex = history.length;

  await reserveAiRequest(params.userId);

  const [userMessage] = await db
    .insert(messages)
    .values({
      sessionId: session.id,
      turnIndex: nextUserIndex,
      role: "user",
      submittedText: params.text,
      rawTranscript: params.rawTranscript,
      inputMode: params.inputMode,
      edited: params.edited,
      assisted: params.assisted,
      usedSuggestionKind: params.usedSuggestionKind,
      audioDurationMs: params.audioDurationMs,
    })
    .returning();

  await db
    .insert(turnRequests)
    .values({ sessionId: session.id, clientRequestId: params.clientRequestId, userMessageId: userMessage.id })
    .onConflictDoNothing();

  let generated;
  try {
    generated = await generateTurn({
      scenario,
      difficulty: session.difficulty as Difficulty,
      personality: session.personality as Personality,
      explanationLanguage: session.explanationLanguage as "none" | "bn",
      history: [...history, { role: "user", text: params.text }],
      learnerMessage: params.text,
    });
  } catch (err) {
    console.error("[sessionService] Turn generation failed; using fallback reply:", err);
    generated = {
      clientMessage: "Sorry, could you say that again in a different way?",
      suggestions: [
        { kind: "direct" as const, text: "Sure — let me rephrase that for you.", why: "A safe way to continue while ideas reload.", meaningBn: null },
        { kind: "clarify" as const, text: "Is there a particular part you'd like me to explain more?", why: "Keeps the conversation moving.", meaningBn: null },
        { kind: "next_step" as const, text: "Let's move on to the next point.", why: "A neutral way forward.", meaningBn: null },
      ],
      objectiveUpdates: [],
      sessionCompleteSuggested: false,
    };
  }

  const [clientMessage] = await db
    .insert(messages)
    .values({
      sessionId: session.id,
      turnIndex: nextUserIndex + 1,
      role: "client",
      submittedText: generated.clientMessage,
      inputMode: "text",
    })
    .returning();

  await persistSuggestions(session.id, clientMessage.id, generated.suggestions);

  await db
    .update(turnRequests)
    .set({ clientMessageId: clientMessage.id })
    .where(and(eq(turnRequests.sessionId, params.sessionId), eq(turnRequests.clientRequestId, params.clientRequestId)));

  await db
    .update(practiceSessions)
    .set({ turnCount: (session.turnCount ?? 0) + 2 })
    .where(eq(practiceSessions.id, session.id));

  const full = await getFullSession(params.sessionId, params.userId);
  return { ...full, objectiveUpdates: generated.objectiveUpdates };
}

export async function retrySuggestions(params: { userId: string; sessionId: string; clientMessageId: string }) {
  const session = await requireOwnedSession(params.sessionId, params.userId);
  const scenario = await resolveScenarioForUser(params.userId, session.scenarioId);
  if (!scenario) throw new NotFoundError("Scenario content missing");

  const history = await getMessageHistory(params.sessionId);
  const msgRows = await db.select().from(messages).where(eq(messages.sessionId, params.sessionId)).orderBy(asc(messages.turnIndex));
  const targetIndex = msgRows.findIndex((m) => m.id === params.clientMessageId);
  if (targetIndex === -1) throw new NotFoundError("Message not found");

  const priorHistory: HistoryTurn[] = msgRows.slice(0, targetIndex).map((m) => ({ role: m.role as "client" | "user", text: m.submittedText }));
  const lastUserMessage = [...priorHistory].reverse().find((m) => m.role === "user");

  await reserveAiRequest(params.userId);

  const generated = await generateTurn({
    scenario,
    difficulty: session.difficulty as Difficulty,
    personality: session.personality as Personality,
    explanationLanguage: session.explanationLanguage as "none" | "bn",
    history: priorHistory,
    learnerMessage: lastUserMessage?.text ?? null,
  });

  await db.delete(suggestionSets).where(eq(suggestionSets.clientMessageId, params.clientMessageId));
  const suggestions = await persistSuggestions(params.sessionId, params.clientMessageId, generated.suggestions);
  return suggestions;
}

export async function endSession(params: { userId: string; sessionId: string }) {
  const session = await requireOwnedSession(params.sessionId, params.userId);
  const scenario = await resolveScenarioForUser(params.userId, session.scenarioId);
  if (!scenario) throw new NotFoundError("Scenario content missing");

  if (session.status !== "ended") {
    await db
      .update(practiceSessions)
      .set({ status: "ended", endedAt: new Date() })
      .where(eq(practiceSessions.id, session.id));
  }

  const existingReview = await db.select().from(reviews).where(eq(reviews.sessionId, session.id)).limit(1);
  if (existingReview.length > 0) {
    return existingReview[0];
  }

  const history = await getMessageHistory(params.sessionId);
  const learnerTurnCount = history.filter((h) => h.role === "user").length;

  if (learnerTurnCount === 0) {
    const [review] = await db
      .insert(reviews)
      .values({
        sessionId: session.id,
        strengths: [],
        improvements: [],
        usefulPhrases: [],
        objectives: scenario.objectives.map((o) => ({ objective: o, completed: false, evidence: null })),
        scores: { clarity: null, grammar: null, vocabulary: null, professionalTone: null, objectiveCompletion: null },
        recommendedScenarioId: pickNextScenario(scenario.id),
      })
      .returning();
    return review;
  }

  await reserveAiRequest(params.userId);
  const result = await generateReview({ scenario, history });

  const [review] = await db
    .insert(reviews)
    .values({
      sessionId: session.id,
      strengths: result.strengths,
      improvements: result.improvements,
      usefulPhrases: result.usefulPhrases,
      objectives: result.objectives,
      scores: result.scores,
      recommendedScenarioId: pickNextScenario(scenario.id),
    })
    .returning();

  return review;
}

function pickNextScenario(currentId: string): string | null {
  const idx = SCENARIOS.findIndex((s) => s.id === currentId);
  if (idx === -1) return null;
  const next = SCENARIOS[(idx + 1) % SCENARIOS.length];
  return next.id;
}

export async function deleteSession(params: { userId: string; sessionId: string }) {
  const session = await requireOwnedSession(params.sessionId, params.userId);
  await db.delete(practiceSessions).where(eq(practiceSessions.id, session.id));
}

export async function exportSessionMarkdown(params: { userId: string; sessionId: string }): Promise<string> {
  const { session, scenario, messages: msgs, review } = await getFullSession(params.sessionId, params.userId);
  const lines: string[] = [];
  lines.push(`# ClientTalk session — ${scenario?.title ?? session.scenarioId}`);
  lines.push("");
  lines.push(`- Started: ${session.startedAt.toISOString()}`);
  lines.push(`- Status: ${session.status}`);
  lines.push(`- Difficulty: ${session.difficulty}, Personality: ${session.personality}`);
  lines.push("");
  lines.push("## Transcript");
  for (const m of msgs) {
    const speaker = m.role === "client" ? scenario?.persona.name ?? "Client" : "You";
    lines.push(`**${speaker}:** ${m.submittedText}`);
  }
  if (review) {
    lines.push("");
    lines.push("## Review");
    lines.push("### Strengths");
    for (const s of (review.strengths as string[]) ?? []) lines.push(`- ${s}`);
    lines.push("### Improvements");
    for (const s of (review.improvements as string[]) ?? []) lines.push(`- ${s}`);
    lines.push("### Useful phrases");
    for (const s of (review.usefulPhrases as string[]) ?? []) lines.push(`- ${s}`);
  }
  return lines.join("\n");
}
