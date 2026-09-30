"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const MAX_RECORDING_SECONDS = 60;

/** Chrome ends a recognition session after every short pause; restart it up to this many times.
    Generous on purpose — this is only a runaway guard, not a session limit. */
const MAX_ATTEMPTS = 30;
const RESTART_DELAY_MS = 250;

export type RecognitionStatus = "idle" | "requesting" | "listening" | "error" | "unsupported";

export interface StartResult {
  ok: boolean;
  /** True when the user cancelled (e.g. pressed stop) while the permission prompt was open. */
  cancelled?: boolean;
}

const MIC_ERROR_CODES = [
  "not-allowed",
  "service-not-allowed",
  "insecure-context",
  "audio-capture",
  "audio-capture-busy",
  "network",
] as const;

export type MicErrorCode = (typeof MIC_ERROR_CODES)[number] | "microphone-error";

function describePermissionError(err: unknown): MicErrorCode {
  const name = err instanceof Error ? err.name : "";
  if (name === "NotAllowedError" || name === "SecurityError") return "not-allowed";
  if (name === "NotFoundError" || name === "OverconstrainedError") return "audio-capture";
  if (name === "NotReadableError" || name === "AbortError") return "audio-capture-busy";
  return "microphone-error";
}

/**
 * Asks for the microphone before the recogniser starts, so permission problems
 * show up as a readable reason instead of a silent no-op. Returns null when the
 * microphone is available.
 */
async function requestMicrophone(): Promise<MicErrorCode | null> {
  if (typeof window === "undefined") return "microphone-error";
  // Speech recognition and getUserMedia both need a secure page; on plain http
  // (e.g. a LAN IP) the browser simply refuses to hand over the microphone.
  if (!window.isSecureContext) return "insecure-context";
  if (!navigator.mediaDevices?.getUserMedia) return null;

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // Hand the device straight back so the recogniser can open its own capture.
    for (const track of stream.getTracks()) track.stop();
    return null;
  } catch (err) {
    return describePermissionError(err);
  }
}

export function useSpeechRecognition() {
  const [status, setStatus] = useState<RecognitionStatus>("idle");
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const finalTranscriptRef = useRef("");
  const interimTranscriptRef = useRef("");
  /** True while the user has a recording session open (i.e. until they stop or the cap hits). */
  const liveRef = useRef(false);
  const elapsedRef = useRef(0);
  const attemptsRef = useRef(0);
  /** Bumped on start/stop/reset so a slow permission prompt can be abandoned safely. */
  const sessionRef = useRef(0);

  const joinTranscript = (final: string, interim: string) =>
    `${final} ${interim}`.replace(/\s+/g, " ").trim();

  /**
   * Synchronous read of everything captured so far, including speech the browser
   * has only reported as an interim result. Used on stop so short answers are not
   * lost when the recogniser never marked them final.
   */
  const getTranscript = useCallback(() => {
    return joinTranscript(finalTranscriptRef.current, interimTranscriptRef.current);
  }, []);

  const supported =
    typeof window !== "undefined" && Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);

  const clearTimers = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }
  }, []);

  const stop = useCallback(() => {
    sessionRef.current += 1;
    liveRef.current = false;
    clearTimers();
    recognitionRef.current?.stop();
    // Commit any interim text to the final transcript so it isn't dropped.
    if (interimTranscriptRef.current) {
      finalTranscriptRef.current = joinTranscript(finalTranscriptRef.current, interimTranscriptRef.current);
      interimTranscriptRef.current = "";
      setTranscript(finalTranscriptRef.current);
      setInterimTranscript("");
    }
  }, [clearTimers]);

  const start = useCallback(async (): Promise<StartResult> => {
    if (typeof window === "undefined") return { ok: false };
    const RecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!RecognitionCtor) {
      setStatus("unsupported");
      return { ok: false };
    }
    if (liveRef.current) return { ok: true };

    const session = sessionRef.current + 1;
    sessionRef.current = session;
    setStatus("requesting");
    setErrorMessage(null);
    setTranscript("");
    setInterimTranscript("");
    finalTranscriptRef.current = "";
    interimTranscriptRef.current = "";
    setElapsedSeconds(0);
    elapsedRef.current = 0;
    attemptsRef.current = 0;

    const permissionError = await requestMicrophone();
    // The user pressed stop/discard, or started over, while the prompt was open.
    if (sessionRef.current !== session) return { ok: false, cancelled: true };
    if (permissionError) {
      setErrorMessage(permissionError);
      setStatus("error");
      return { ok: false };
    }

    clearTimers();
    liveRef.current = true;

    const fail = (code: MicErrorCode) => {
      liveRef.current = false;
      clearTimers();
      setErrorMessage(code);
      setStatus("error");
    };

    const spawn = () => {
      if (attemptsRef.current >= MAX_ATTEMPTS) {
        fail("microphone-error");
        return;
      }
      attemptsRef.current += 1;

      const recognition = new RecognitionCtor();
      recognition.lang = "en-US";
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        let interim = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const text = result[0]?.transcript ?? "";
          if (result.isFinal) {
            finalTranscriptRef.current += `${text} `;
          } else {
            interim += text;
          }
        }
        interimTranscriptRef.current = interim;
        setTranscript(finalTranscriptRef.current.trim());
        setInterimTranscript(interim);
      };

      recognition.onerror = (event) => {
        const code = event.error || "microphone-error";
        // Reported when the recogniser simply heard nothing; onend follows and we restart.
        if (code === "no-speech" || code === "aborted") return;
        fail((MIC_ERROR_CODES as readonly string[]).includes(code) ? (code as MicErrorCode) : "microphone-error");
      };

      recognition.onend = () => {
        if (sessionRef.current !== session) return;
        if (!liveRef.current) {
          // Only a real end (user stop, or the 60s cap) leaves the listening state.
          setStatus((prev) => (prev === "error" ? prev : "idle"));
          return;
        }
        if (elapsedRef.current >= MAX_RECORDING_SECONDS) {
          liveRef.current = false;
          setStatus("idle");
          return;
        }
        // Keep listening: the browser closes the session after every short pause.
        retryTimerRef.current = setTimeout(() => {
          if (liveRef.current && sessionRef.current === session) spawn();
        }, RESTART_DELAY_MS);
      };

      recognitionRef.current = recognition;
      try {
        recognition.start();
        setStatus("listening");
      } catch {
        // Chrome throws if the previous session has not finished tearing down yet.
        retryTimerRef.current = setTimeout(() => {
          if (liveRef.current && sessionRef.current === session) spawn();
        }, RESTART_DELAY_MS);
      }
    };

    // Timers are cleared before spawning: a failed start schedules its own retry.
    spawn();

    timerRef.current = setInterval(() => {
      elapsedRef.current += 1;
      setElapsedSeconds(elapsedRef.current);
      if (elapsedRef.current >= MAX_RECORDING_SECONDS) {
        liveRef.current = false;
        clearTimers();
        recognitionRef.current?.stop();
        setStatus("idle");
      }
    }, 1000);

    return { ok: true };
  }, [clearTimers]);

  const reset = useCallback(() => {
    sessionRef.current += 1;
    liveRef.current = false;
    clearTimers();
    setTranscript("");
    setInterimTranscript("");
    finalTranscriptRef.current = "";
    interimTranscriptRef.current = "";
    setElapsedSeconds(0);
    elapsedRef.current = 0;
    setErrorMessage(null);
    setStatus("idle");
  }, [clearTimers]);

  useEffect(() => {
    return () => {
      liveRef.current = false;
      sessionRef.current += 1;
      recognitionRef.current?.stop();
      clearTimers();
    };
  }, [clearTimers]);

  return {
    supported,
    status,
    transcript,
    interimTranscript,
    elapsedSeconds,
    errorMessage,
    getTranscript,
    start,
    stop,
    reset,
  };
}
