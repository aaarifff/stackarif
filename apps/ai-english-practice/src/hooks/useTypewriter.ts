"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/**
 * Reveal pacing for a steady stream of characters: fast enough to feel live,
 * slow enough that only a couple of characters land per frame (which is what
 * makes it read as typing rather than jumping).
 */
const MS_PER_CHARACTER = 14;
const MIN_DURATION_MS = 260;
const MAX_DURATION_MS = 1800;

function subscribeToReducedMotion(onChange: () => void) {
  if (typeof window === "undefined") return () => {};
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/**
 * Progressively reveals `text` one character at a time. When `enabled` is false
 * (history, or a message that didn't just arrive) the full text is returned
 * immediately, and someone who asked for reduced motion never sees the reveal.
 */
export function useTypewriter(text: string, enabled: boolean, onTick?: () => void) {
  const reducedMotion = usePrefersReducedMotion();
  const shouldAnimate = enabled && !reducedMotion && text.length > 0;
  const [revealed, setRevealed] = useState(() => (enabled ? 0 : text.length));

  // Kept in a ref so a new callback identity doesn't restart a running reveal.
  const onTickRef = useRef(onTick);
  useEffect(() => {
    onTickRef.current = onTick;
  }, [onTick]);

  useEffect(() => {
    if (!shouldAnimate) return;

    const duration = Math.min(MAX_DURATION_MS, Math.max(MIN_DURATION_MS, text.length * MS_PER_CHARACTER));
    let frame = 0;
    let startedAt: number | null = null;
    let last = 0;

    const step = (now: number) => {
      if (startedAt === null) startedAt = now;
      // A steady linear walk through the text; the slow bit is the end, where
      // the last character lands on its own instead of jumping to the full reply.
      const progress = Math.min(1, (now - startedAt) / duration);
      const next = progress >= 1 ? text.length : Math.ceil(progress * text.length);
      if (next !== last) {
        last = next;
        setRevealed(next);
        onTickRef.current?.();
      }
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [text, shouldAnimate]);

  const typing = shouldAnimate && revealed < text.length;
  return { displayed: typing ? text.slice(0, revealed) : text, typing };
}
