"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSpeechRecognition, MAX_RECORDING_SECONDS } from "@/hooks/useSpeechRecognition";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import SuggestionCards from "./SuggestionCards";
import ObjectivesPanel from "./ObjectivesPanel";
import type { PracticeMessage, PracticeSessionData } from "./types";

type Kind = "direct" | "clarify" | "next_step";
type RoomStatus = "ready" | "recording" | "transcribing" | "reviewing" | "thinking" | "speaking" | "paused" | "error";

/** Plain-language explanations for the reasons voice capture can fail. */
const MIC_ERROR_MESSAGES: Record<string, string> = {
  "not-allowed":
    "Microphone access was denied. Allow it for this site in your browser settings, or practise by typing your reply.",
  "service-not-allowed":
    "Your browser blocked voice input on this page. Check the microphone permission, or practise by typing.",
  "insecure-context": "Voice input needs a secure page — open the site over https:// or on localhost.",
  "audio-capture": "No microphone was found. Connect one, or practise by typing your reply.",
  "audio-capture-busy": "Another app is using your microphone. Close it and try again.",
  network:
    "Voice recognition could not reach your browser's speech service. Check your connection, or type your reply.",
};
const MIC_ERROR_FALLBACK = "Voice input stopped unexpectedly. You can still practise by typing your reply.";

function genRequestId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function PracticeRoom({
  initial,
  explanationEnabled,
}: {
  initial: PracticeSessionData;
  explanationEnabled: boolean;
}) {
  const router = useRouter();
  const [messages, setMessages] = useState<PracticeMessage[]>(initial.messages);
  const [status, setStatus] = useState<RoomStatus>("ready");
  const [draft, setDraft] = useState("");
  const [assisted, setAssisted] = useState(false);
  const [assistedOriginal, setAssistedOriginal] = useState<string | null>(null);
  const [usedSuggestionKind, setUsedSuggestionKind] = useState<Kind | null>(null);
  const [suggestionsHidden, setSuggestionsHidden] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retryingSuggestions, setRetryingSuggestions] = useState(false);
  const [completedObjectives, setCompletedObjectives] = useState<Set<string>>(new Set());
  const [ending, setEnding] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [rawTranscript, setRawTranscript] = useState<string | null>(null);
  const [audioDurationMs, setAudioDurationMs] = useState<number | null>(null);
  const [saveNotice, setSaveNotice] = useState<string | null>(null);
  const [enterToSend, setEnterToSend] = useState(true);
  /** Id of the reply that should be revealed like it is being typed. */
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);

  const pendingRequestId = useRef<string>(genRequestId());
  const transcriptEndRef = useRef<HTMLDivElement | null>(null);
  const transcriptRef = useRef<HTMLDivElement | null>(null);
  const stickToBottomRef = useRef(true);
  const hasAutoPlayed = useRef<Set<string>>(new Set());

  const recognition = useSpeechRecognition();
  const synthesis = useSpeechSynthesis();

  const scenario = initial.scenario;
  const lastMessage = messages[messages.length - 1];
  const lastClientMessage = [...messages].reverse().find((m) => m.role === "client") || null;

  // A microphone failure ends the recording UI even while the room still thinks it is recording,
  // so the composer falls back to typing instead of sitting on a dead recorder.
  const micError = recognition.status === "error" ? recognition.errorMessage : null;
  const micNotice = micError ? (MIC_ERROR_MESSAGES[micError] ?? MIC_ERROR_FALLBACK) : null;
  const recordingActive = status === "recording" && micError === null;
  const displayStatus: RoomStatus = micError ? "error" : status;

  useEffect(() => {
    if (!stickToBottomRef.current) return;
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length, status]);

  /** Re-checked on scroll so a reveal only drags the view down when the reader is already at the bottom. */
  function handleTranscriptScroll() {
    const el = transcriptRef.current;
    if (!el) return;
    stickToBottomRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 96;
  }

  /** Called on every reveal step: keeps the growing reply in view without a smooth-scroll fight. */
  function followTyping() {
    const el = transcriptRef.current;
    if (!el || !stickToBottomRef.current) return;
    // Scroll after the revealed word has been painted, or the view lags a line behind.
    requestAnimationFrame(() => {
      if (stickToBottomRef.current) el.scrollTop = el.scrollHeight;
    });
  }

  // Auto-play the latest client message once.
  useEffect(() => {
    if (!lastClientMessage) return;
    if (hasAutoPlayed.current.has(lastClientMessage.id)) return;
    hasAutoPlayed.current.add(lastClientMessage.id);
    setStatus("speaking");
    synthesis.speak(lastClientMessage.submittedText, 1, () => setStatus("ready"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastClientMessage?.id]);

  // If the recogniser stops on its own (e.g. the 60s cap is reached), move the UI
  // into the review step so the captured transcript isn't stranded in "recording".
  useEffect(() => {
    if (status === "recording" && recognition.status === "idle") {
      stopRecording();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, recognition.status]);

  function logAssistance(eventType: string, suggestionKind?: Kind | null) {
    if (!lastClientMessage) return;
    fetch(`/api/sessions/${initial.session.id}/assistance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientMessageId: lastClientMessage.id, eventType, suggestionKind: suggestionKind ?? null }),
    }).catch(() => undefined);
  }

  function handleUseSuggestion(kind: Kind, text: string) {
    setDraft(text);
    setAssisted(true);
    setAssistedOriginal(text);
    setUsedSuggestionKind(kind);
    logAssistance("used", kind);
  }

  function handleListen(text: string) {
    synthesis.speak(text, 1);
  }

  function handlePractiseAloud(kind: Kind, text: string) {
    setUsedSuggestionKind(kind);
    logAssistance("practiced_aloud", kind);
    void startRecording();
  }

  async function handleRetrySuggestions() {
    if (!lastClientMessage) return;
    setRetryingSuggestions(true);
    try {
      const res = await fetch(`/api/sessions/${initial.session.id}/suggestions/retry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientMessageId: lastClientMessage.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || "Could not refresh ideas.");
        return;
      }
      setMessages((prev) =>
        prev.map((m) =>
          m.id === lastClientMessage.id
            ? {
                ...m,
                suggestions: {
                  id: data.suggestions.id,
                  direct: { text: data.suggestions.directText, why: data.suggestions.directWhy, meaningBn: data.suggestions.directBn },
                  clarify: { text: data.suggestions.clarifyText, why: data.suggestions.clarifyWhy, meaningBn: data.suggestions.clarifyBn },
                  nextStep: { text: data.suggestions.nextStepText, why: data.suggestions.nextStepWhy, meaningBn: data.suggestions.nextStepBn },
                },
              }
            : m,
        ),
      );
    } catch {
      setErrorMessage("Network error while refreshing ideas.");
    } finally {
      setRetryingSuggestions(false);
    }
  }

  async function startRecording() {
    setErrorMessage(null);
    synthesis.cancel();
    setVoiceMode(true);
    setStatus("recording");
    // start() asks for the microphone first, so a refusal is reported explicitly.
    const result = await recognition.start();
    if (!result.ok && !result.cancelled) {
      setVoiceMode(false);
      setStatus("error");
    }
  }

  function stopRecording() {
    // Cancelled while the browser was still asking for the microphone: nothing was captured.
    if (recognition.status === "requesting") {
      discardRecording();
      return;
    }
    recognition.stop();
    // getTranscript() reads refs synchronously, so it also picks up speech the
    // browser only reported as an interim result (otherwise short answers are lost).
    const transcript = recognition.getTranscript();
    setStatus("reviewing");
    setRawTranscript(transcript);
    setAudioDurationMs(recognition.elapsedSeconds * 1000);
    setDraft(transcript);
    setAssisted(false);
    setAssistedOriginal(null);
    setUsedSuggestionKind(null);
  }

  function discardRecording() {
    recognition.reset();
    setDraft("");
    setRawTranscript(null);
    setAudioDurationMs(null);
    setStatus("ready");
    setVoiceMode(false);
  }

  async function handleSend() {
    const text = draft.trim();
    if (!text || status === "thinking") return;

    setStatus("thinking");
    setErrorMessage(null);
    const requestId = pendingRequestId.current;
    const edited = assisted ? assistedOriginal !== text : voiceMode ? rawTranscript !== text : false;

    try {
      const res = await fetch(`/api/sessions/${initial.session.id}/turns`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientRequestId: requestId,
          text,
          inputMode: voiceMode ? "voice" : "text",
          rawTranscript: voiceMode ? rawTranscript : null,
          edited,
          assisted,
          usedSuggestionKind,
          audioDurationMs: voiceMode ? audioDurationMs : null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || "Could not send your reply. Please try again.");
        setStatus("error");
        return;
      }

      pendingRequestId.current = genRequestId();
      const knownIds = new Set(messages.map((m) => m.id));
      const nextMessages = data.messages.map((m: { suggestions: { id: string; directText: string; directWhy: string; directBn: string | null; clarifyText: string; clarifyWhy: string; clarifyBn: string | null; nextStepText: string; nextStepWhy: string; nextStepBn: string | null } | null } & PracticeMessage) =>
        m.role === "client" && m.suggestions
          ? {
              ...m,
              suggestions: {
                id: m.suggestions.id,
                direct: { text: m.suggestions.directText, why: m.suggestions.directWhy, meaningBn: m.suggestions.directBn },
                clarify: { text: m.suggestions.clarifyText, why: m.suggestions.clarifyWhy, meaningBn: m.suggestions.clarifyBn },
                nextStep: { text: m.suggestions.nextStepText, why: m.suggestions.nextStepWhy, meaningBn: m.suggestions.nextStepBn },
              },
            }
          : m,
      );
      // Only the reply delivered by this turn is typed out; older history renders at once.
      const freshReply = nextMessages.find((m: PracticeMessage) => m.role === "client" && !knownIds.has(m.id));
      setTypingMessageId(freshReply?.id ?? null);
      setMessages(nextMessages);
      if (Array.isArray(data.objectiveUpdates)) {
        setCompletedObjectives((prev) => {
          const next = new Set(prev);
          for (const o of data.objectiveUpdates) next.add(o);
          return next;
        });
      }
      setDraft("");
      setAssisted(false);
      setAssistedOriginal(null);
      setUsedSuggestionKind(null);
      setRawTranscript(null);
      setAudioDurationMs(null);
      setVoiceMode(false);
      recognition.reset();
      setStatus("ready");
    } catch {
      setErrorMessage("Network error. Your draft is safe — please try sending again.");
      setStatus("error");
    }
  }

  async function handleEndSession() {
    setEnding(true);
    try {
      await fetch(`/api/sessions/${initial.session.id}/end`, { method: "POST" });
      router.push(`/sessions/${initial.session.id}/review`);
    } finally {
      setEnding(false);
    }
  }

  async function handleSavePhrase(phrase: string) {
    try {
      await fetch("/api/vocabulary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phrase: phrase.slice(0, 200), topic: scenario.category, sourceSessionId: initial.session.id }),
      });
      setSaveNotice("Saved to your vocabulary notebook.");
      setTimeout(() => setSaveNotice(null), 2500);
    } catch {
      setSaveNotice(null);
    }
  }

  const recordingSecondsLeft = MAX_RECORDING_SECONDS - recognition.elapsedSeconds;

  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr_280px]">
      {/* Scenario rail */}
      <aside className="order-1 space-y-4 lg:order-none">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand">{scenario.categoryLabel}</p>
          <h1 className="mt-1 text-base font-semibold text-foreground">{scenario.title}</h1>
          <p className="mt-1 text-xs text-muted-foreground capitalize">
            {initial.session.difficulty} · {initial.session.personality}
          </p>
        </div>
        <div className="hidden lg:block">
          <ObjectivesPanel
            objectives={scenario.objectives}
            completed={completedObjectives}
            vocabulary={scenario.vocabulary}
            onSaveVocab={(phrase, meaning) =>
              fetch("/api/vocabulary", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phrase, meaning, topic: scenario.category, sourceSessionId: initial.session.id }),
              }).then(() => {
                setSaveNotice("Saved to your vocabulary notebook.");
                setTimeout(() => setSaveNotice(null), 2500);
              })
            }
          />
        </div>
      </aside>

      {/* Conversation column */}
      <section className="order-2 flex min-h-[70vh] flex-col rounded-xl border border-border bg-card lg:order-none">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <p className="text-sm font-medium text-muted-foreground">
            Status: <span className="font-semibold text-foreground capitalize">{displayStatus}</span>
          </p>
          <button
            onClick={handleEndSession}
            disabled={ending}
            className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:border-danger/40 hover:text-danger disabled:opacity-60"
          >
            {ending ? "Ending…" : "End session"}
          </button>
        </div>

        <div
          ref={transcriptRef}
          onScroll={handleTranscriptScroll}
          className="flex-1 space-y-3 overflow-y-auto scrollbar-thin px-4 py-4"
        >
          {messages.map((m) => (
            <MessageBubble
              key={m.id}
              message={m}
              clientName={scenario.persona.name}
              onSavePhrase={handleSavePhrase}
              animate={m.id === typingMessageId}
              onTypingProgress={followTyping}
              onTypingComplete={() => setTypingMessageId((current) => (current === m.id ? null : current))}
            />
          ))}
          {status === "thinking" && <TypingIndicator name={scenario.persona.name} />}
          <div ref={transcriptEndRef} />
        </div>

        {micNotice && (
          <div role="status" className="mx-4 mb-2 rounded-lg bg-warning-muted px-3 py-2 text-xs text-warning">
            {micNotice}
          </div>
        )}
        {errorMessage && (
          <div role="alert" className="mx-4 mb-2 rounded-lg bg-destructive/10 px-3 py-2 text-xs text-danger">
            {errorMessage}
          </div>
        )}
        {saveNotice && <div className="mx-4 mb-2 rounded-lg bg-success-muted px-3 py-2 text-xs text-success">{saveNotice}</div>}

        <div className="safe-bottom border-t border-border p-4">
          {recordingActive ? (
            <div className="rounded-xl border border-danger/30 bg-destructive/10 px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-destructive" aria-hidden />
                  <p className="text-sm font-medium text-danger">
                    Recording… {recordingSecondsLeft}s left
                  </p>
                </div>
                <button
                  onClick={stopRecording}
                  className="rounded-lg bg-destructive px-4 py-2 text-sm font-semibold text-white hover:bg-destructive/90"
                >
                  {recognition.status === "requesting" ? "Cancel" : "Stop recording"}
                </button>
              </div>
              <p className="mt-2 min-h-[1.25rem] text-sm text-muted-foreground" role="status" aria-live="polite">
                {recognition.status === "requesting" && <span>Waiting for your microphone… allow access when asked.</span>}
                {recognition.status !== "requesting" && recognition.transcript && <span>{recognition.transcript} </span>}
                {recognition.status !== "requesting" && recognition.interimTranscript && (
                  <span className="text-muted-foreground">{recognition.interimTranscript}</span>
                )}
                {recognition.status === "listening" &&
                  !recognition.transcript &&
                  !recognition.interimTranscript && <span className="text-muted-foreground">Listening… start speaking.</span>}
              </p>
            </div>
          ) : status === "reviewing" ? (
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Review your transcript before sending
              </label>
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-border p-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
              <div className="flex gap-2">
                <button
                  onClick={discardRecording}
                  className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-muted-foreground hover:border-danger/40 hover:text-danger"
                >
                  Discard
                </button>
                <button
                  onClick={handleSend}
                  className="ml-auto rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Send answer
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <textarea
                value={draft}
                onChange={(e) => {
                  setDraft(e.target.value);
                  if (assistedOriginal !== null && e.target.value !== assistedOriginal) {
                    // still assisted, but now edited — flag computed on send
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key !== "Enter" || e.nativeEvent.isComposing) return;
                  if (enterToSend && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  } else if (!enterToSend && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Type a reply…"
                rows={2}
                maxLength={2000}
                disabled={status === "thinking"}
                className="w-full rounded-xl border border-border p-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:bg-background"
              />
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={startRecording}
                  disabled={!recognition.supported || status === "thinking"}
                  className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-muted-foreground hover:border-brand/40 hover:text-brand disabled:opacity-50"
                  title={!recognition.supported ? "Voice input isn't supported in this browser" : undefined}
                >
                  🎙 Start recording
                </button>
                <button
                  type="button"
                  onClick={() => setEnterToSend((v) => !v)}
                  aria-pressed={enterToSend}
                  className="ml-auto rounded-lg border border-border px-2.5 py-2 text-xs font-medium text-muted-foreground hover:border-brand/40 hover:text-brand"
                  title={
                    enterToSend
                      ? "Enter sends the message (Shift+Enter for a new line)"
                      : "Enter adds a new line (Ctrl/Cmd+Enter sends)"
                  }
                >
                  {enterToSend ? "⏎ Send" : "⏎ New line"}
                </button>
                <button
                  onClick={handleSend}
                  disabled={!draft.trim() || status === "thinking"}
                  className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
                >
                  {status === "thinking" ? "Sending…" : "Send"}
                </button>
              </div>
              {!recognition.supported && (
                <p className="text-xs text-muted-foreground">
                  Voice input needs a browser like Chrome or Edge. Text practice always works here.
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Coach / suggestions column */}
      <aside className="order-3 space-y-4 lg:order-none">
        <SuggestionCards
          suggestions={lastMessage?.role === "client" ? lastMessage.suggestions : null}
          hidden={suggestionsHidden}
          onToggleHidden={() => setSuggestionsHidden((v) => !v)}
          onUse={handleUseSuggestion}
          onListen={handleListen}
          onPractiseAloud={handlePractiseAloud}
          onRetry={handleRetrySuggestions}
          retrying={retryingSuggestions}
          explanationEnabled={explanationEnabled}
          partnerNoun={scenario.theme ? "partner" : "client"}
        />
        <div className="lg:hidden">
          <ObjectivesPanel
            objectives={scenario.objectives}
            completed={completedObjectives}
            vocabulary={scenario.vocabulary}
            onSaveVocab={(phrase, meaning) =>
              fetch("/api/vocabulary", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phrase, meaning, topic: scenario.category, sourceSessionId: initial.session.id }),
              })
            }
          />
        </div>
      </aside>
    </div>
  );
}
