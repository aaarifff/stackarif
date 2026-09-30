import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import { getFullSession, NotFoundError, ForbiddenError } from "@/server/services/sessionService";
import PracticeRoom from "@/components/practice/PracticeRoom";

export const dynamic = "force-dynamic";

export default async function PracticePage({ params }: { params: Promise<{ sessionId: string }> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!user.onboarded) redirect("/onboarding");

  const { sessionId } = await params;

  let data;
  try {
    data = await getFullSession(sessionId, user.id);
  } catch (err) {
    if (err instanceof NotFoundError || err instanceof ForbiddenError) notFound();
    throw err;
  }

  if (!data.scenario) notFound();

  if (data.session.status === "ended") {
    redirect(`/sessions/${data.session.id}/review`);
  }

  const serialized = {
    session: {
      id: data.session.id,
      scenarioId: data.session.scenarioId,
      difficulty: data.session.difficulty,
      personality: data.session.personality,
      explanationLanguage: data.session.explanationLanguage,
      status: data.session.status,
      startedAt: data.session.startedAt.toISOString(),
    },
    scenario: data.scenario,
    messages: data.messages.map((m) => ({
      id: m.id,
      turnIndex: m.turnIndex,
      role: m.role as "client" | "user",
      submittedText: m.submittedText,
      inputMode: m.inputMode,
      edited: m.edited,
      assisted: m.assisted,
      createdAt: m.createdAt.toISOString(),
      suggestions: m.suggestions
        ? {
            id: m.suggestions.id,
            direct: { text: m.suggestions.directText, why: m.suggestions.directWhy, meaningBn: m.suggestions.directBn },
            clarify: { text: m.suggestions.clarifyText, why: m.suggestions.clarifyWhy, meaningBn: m.suggestions.clarifyBn },
            nextStep: { text: m.suggestions.nextStepText, why: m.suggestions.nextStepWhy, meaningBn: m.suggestions.nextStepBn },
          }
        : null,
    })),
  };

  return (
    <AppShell>
      <PracticeRoom initial={serialized} explanationEnabled={data.session.explanationLanguage === "bn"} />
    </AppShell>
  );
}
