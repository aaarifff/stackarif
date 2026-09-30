"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { applySpeechVoice } from "@/lib/speechVoice";

export function useSpeechSynthesis() {
  const [speaking, setSpeaking] = useState(false);
  const [failed, setFailed] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const supported = typeof window !== "undefined" && "speechSynthesis" in window;

  const cancel = useCallback(() => {
    utteranceRef.current = null;
    if (supported) {
      window.speechSynthesis.cancel();
    }
    setSpeaking(false);
  }, [supported]);

  const speak = useCallback(
    (text: string, rate = 1, onEnd?: () => void) => {
      if (!supported) {
        setFailed(true);
        onEnd?.();
        return;
      }
      utteranceRef.current = null;
      window.speechSynthesis.cancel();
      setFailed(false);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      applySpeechVoice(utterance);
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => {
        if (utteranceRef.current !== utterance) return;
        setSpeaking(false);
        onEnd?.();
      };
      utterance.onerror = () => {
        if (utteranceRef.current !== utterance) return;
        setSpeaking(false);
        setFailed(true);
        onEnd?.();
      };
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [supported],
  );

  useEffect(() => {
    return () => {
      utteranceRef.current = null;
      if (supported) window.speechSynthesis.cancel();
    };
  }, [supported]);

  return { supported, speaking, failed, speak, cancel };
}
