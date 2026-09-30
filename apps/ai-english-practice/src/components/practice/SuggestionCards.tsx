"use client";

import type { MessageSuggestions } from "./types";

type Kind = "direct" | "clarify" | "next_step";

const LABELS: Record<Kind, string> = {
  direct: "Direct answer",
  clarify: "Clarify",
  next_step: "Next step",
};

export default function SuggestionCards({
  suggestions,
  hidden,
  onToggleHidden,
  onUse,
  onListen,
  onPractiseAloud,
  onRetry,
  retrying,
  explanationEnabled,
  partnerNoun = "client",
}: {
  suggestions: MessageSuggestions | null;
  hidden: boolean;
  onToggleHidden: () => void;
  onUse: (kind: Kind, text: string) => void;
  onListen: (text: string) => void;
  onPractiseAloud: (kind: Kind, text: string) => void;
  onRetry: () => void;
  retrying: boolean;
  explanationEnabled: boolean;
  /** What to call the practice partner in placeholder copy ("client" or "partner"). */
  partnerNoun?: string;
}) {
  const items: { kind: Kind; text: string; why: string; meaningBn?: string | null }[] = suggestions
    ? [
        { kind: "direct", ...suggestions.direct },
        { kind: "clarify", ...suggestions.clarify },
        { kind: "next_step", ...suggestions.nextStep },
      ]
    : [];

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-foreground">Three ways to reply</p>
        <button onClick={onToggleHidden} className="text-xs font-medium text-brand hover:underline">
          {hidden ? "Show ideas" : "Hide ideas"}
        </button>
      </div>

      {!hidden && (
        <>
          {suggestions ? (
            <div className="mt-3 space-y-2.5">
              {items.map((item) => (
                <div key={item.kind} className="rounded-lg border border-border p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-brand">
                    {LABELS[item.kind]}
                  </p>
                  <p className="mt-1 text-sm text-foreground">{item.text}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.why}</p>
                  {explanationEnabled && item.meaningBn && (
                    <p className="mt-1 text-xs text-muted-foreground">বাংলা: {item.meaningBn}</p>
                  )}
                  <div className="mt-2 flex flex-wrap gap-2">
                    <button
                      onClick={() => onListen(item.text)}
                      className="rounded-md border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground hover:border-brand/40 hover:text-brand"
                    >
                      🔊 Listen
                    </button>
                    <button
                      onClick={() => onUse(item.kind, item.text)}
                      className="rounded-md border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground hover:border-brand/40 hover:text-brand"
                    >
                      Use in text box
                    </button>
                    <button
                      onClick={() => onPractiseAloud(item.kind, item.text)}
                      className="rounded-md border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground hover:border-brand/40 hover:text-brand"
                    >
                      🎙 Practise aloud
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={onRetry}
                disabled={retrying}
                className="text-xs font-medium text-muted-foreground hover:text-brand disabled:opacity-60"
              >
                {retrying ? "Refreshing ideas…" : "↺ Retry ideas"}
              </button>
            </div>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              Ideas will appear here after the {partnerNoun}&apos;s message.
            </p>
          )}
        </>
      )}
    </div>
  );
}
