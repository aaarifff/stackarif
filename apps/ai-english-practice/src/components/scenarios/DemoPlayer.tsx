"use client";

import { useEffect, useRef, useState } from "react";
import type { DemoScript } from "@/content/demos";
import { applySpeechVoice } from "@/lib/speechVoice";

export default function DemoPlayer({
  demo,
  partnerLabel = "Client",
  learnerLabel = "Freelancer",
}: {
  demo: DemoScript;
  /** Speaker labels; themed practice talks to a partner rather than a business client. */
  partnerLabel?: string;
  learnerLabel?: string;
}) {
  const [index, setIndex] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  function speakTurn(i: number) {
    setIndex(i);
    const turn = demo.turns[i];
    if (!turn) {
      setPlaying(false);
      return;
    }
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setPlaying(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(turn.text);
    applySpeechVoice(utterance);
    utterance.rate = 0.95;
    utterance.pitch = turn.speaker === "client" ? 1 : 0.9;
    utterance.onend = () => {
      if (i + 1 < demo.turns.length) {
        speakTurn(i + 1);
      } else {
        setPlaying(false);
      }
    };
    utterance.onerror = () => setPlaying(false);
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }

  function handlePlay() {
    setPlaying(true);
    speakTurn(index + 1 >= demo.turns.length ? 0 : Math.max(index, 0));
  }

  function handlePause() {
    setPlaying(false);
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }

  function handleReplay() {
    handlePause();
    setIndex(-1);
    setPlaying(true);
    speakTurn(0);
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Sample conversation</p>
          <h2 className="mt-1 text-base font-semibold text-foreground">{demo.title}</h2>
        </div>
        <p className="text-xs text-muted-foreground">Browser voices</p>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{demo.description}</p>

      <div className="mt-4 max-h-72 space-y-2 overflow-y-auto scrollbar-thin pr-1">
        {demo.turns.map((turn, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm transition ${
              turn.speaker === "client" ? "bg-muted text-foreground" : "ml-auto bg-brand-muted text-brand"
            } ${index === i ? "ring-2 ring-brand" : ""}`}
          >
            <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-wide opacity-60">
              {turn.speaker === "client" ? partnerLabel : learnerLabel}
            </span>
            {turn.text}
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2">
        {!playing ? (
          <button
            onClick={handlePlay}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            ▶ Play
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground hover:bg-secondary/90"
          >
            ⏸ Pause
          </button>
        )}
        <button
          onClick={handleReplay}
          className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-muted-foreground hover:border-brand/40"
        >
          ↺ Replay from start
        </button>
      </div>
    </div>
  );
}
