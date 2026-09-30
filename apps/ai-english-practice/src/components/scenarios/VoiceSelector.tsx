"use client";

import { useEffect, useId, useState } from "react";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { getSavedVoice, saveVoice } from "@/lib/speechVoice";

export default function VoiceSelector() {
  const id = useId();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selected, setSelected] = useState("");
  const [ready, setReady] = useState(false);
  const [saved, setSaved] = useState(true);
  const speech = useSpeechSynthesis();

  useEffect(() => {
    function refresh() {
      setReady(true);
      setSelected(getSavedVoice());
      if ("speechSynthesis" in window) {
        setVoices(window.speechSynthesis.getVoices()
          .filter((voice) => /^en(?:[-_]|$)/i.test(voice.lang))
          .sort((a, b) => a.lang.localeCompare(b.lang) || a.name.localeCompare(b.name)));
      }
    }
    const timer = window.setTimeout(refresh, 0);
    window.speechSynthesis?.addEventListener("voiceschanged", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.clearTimeout(timer);
      window.speechSynthesis?.removeEventListener("voiceschanged", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const unavailable = selected !== "" && !voices.some((voice) => voice.voiceURI === selected);

  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <label htmlFor={id} className="block text-sm font-semibold text-foreground">Speaking voice</label>
      <p id={`${id}-description`} className="mt-1 text-sm text-muted-foreground">
        Choose the voice for sample conversations and practice playback. Available voices depend on your browser and device.
      </p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <select
          id={id}
          aria-describedby={`${id}-description`}
          value={unavailable ? "" : selected}
          disabled={!ready || !speech.supported}
          onChange={(event) => {
            speech.cancel();
            setSelected(event.target.value);
            setSaved(saveVoice(event.target.value));
          }}
          className="h-11 min-w-0 flex-1 rounded-xl border border-border bg-card px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:opacity-60"
        >
          <option value="">Automatic English voice</option>
          {voices.map((voice) => (
            <option key={voice.voiceURI} value={voice.voiceURI}>{voice.name} ({voice.lang})</option>
          ))}
        </select>
        <button
          type="button"
          disabled={!ready || !speech.supported}
          onClick={() => speech.speaking ? speech.cancel() : speech.speak("Hello! Let’s practise English together. Tell me about your project.")}
          className="h-11 shrink-0 rounded-xl border border-brand/30 px-4 text-sm font-semibold text-brand hover:bg-brand-muted disabled:opacity-60"
        >
          {speech.speaking ? "Stop preview" : "Preview voice"}
        </button>
      </div>
      <p className="mt-2 text-xs text-muted-foreground" role="status">
        {!ready ? "Loading voices…" : !speech.supported ? "Voice playback is unavailable in this browser. You can still practise using text."
          : speech.failed ? "Could not play this voice. Try another voice or browser."
          : !saved ? "Voice selected for this visit. Browser storage is unavailable."
          : unavailable ? "Your saved voice is unavailable here. Using an automatic English voice."
          : voices.length === 0 ? "No English voices listed yet. Automatic playback will use your browser’s available voice."
          : "Your choice is remembered on this browser."}
      </p>
    </section>
  );
}
