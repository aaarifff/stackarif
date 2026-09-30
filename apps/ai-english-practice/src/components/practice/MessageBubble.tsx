"use client";

import { useEffect } from "react";
import { useTypewriter } from "@/hooks/useTypewriter";
import type { PracticeMessage } from "./types";

export default function MessageBubble({
  message,
  clientName,
  onSavePhrase,
  animate = false,
  onTypingProgress,
  onTypingComplete,
}: {
  message: PracticeMessage;
  clientName: string;
  onSavePhrase: (text: string) => void;
  /** Reveal this message character by character (used for the reply just delivered). */
  animate?: boolean;
  onTypingProgress?: () => void;
  onTypingComplete?: () => void;
}) {
  const isClient = message.role === "client";
  const { displayed, typing } = useTypewriter(message.submittedText, animate, onTypingProgress);

  useEffect(() => {
    if (animate && !typing) onTypingComplete?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate, typing]);

  return (
    <div className={`flex flex-col ${isClient ? "items-start" : "items-end"}`}>
      <div
        className={`group relative max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isClient ? "rounded-tl-sm bg-muted text-foreground" : "rounded-tr-sm bg-primary text-primary-foreground"
        }`}
      >
        <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-wide opacity-60">
          {isClient ? clientName : "You"}
          {message.assisted && !isClient ? " · assisted" : ""}
          {message.edited && !isClient ? " · edited" : ""}
        </span>
        <span>
          {displayed}
          {typing && (
            <span
              aria-hidden
              className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-[2px] animate-pulse rounded-full bg-current align-baseline"
              style={{ animationDuration: "800ms" }}
            />
          )}
        </span>
      </div>
      <button
        onClick={() => onSavePhrase(message.submittedText)}
        className={`mt-1 text-[11px] font-medium text-muted-foreground transition hover:text-brand focus:text-brand ${
          typing ? "invisible" : ""
        }`}
        tabIndex={typing ? -1 : undefined}
      >
        + Save phrase
      </button>
    </div>
  );
}
