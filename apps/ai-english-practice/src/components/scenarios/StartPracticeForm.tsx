"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Difficulty, Personality } from "@/lib/types";

const PERSONALITIES: { id: Personality; label: string }[] = [
  { id: "friendly", label: "Friendly" },
  { id: "busy", label: "Busy" },
  { id: "nontechnical", label: "Non-technical" },
  { id: "skeptical", label: "Skeptical" },
  { id: "budget-conscious", label: "Budget-conscious" },
];

export default function StartPracticeForm({
  scenarioId,
  defaultDifficulty,
  personalityLabel,
}: {
  scenarioId: string;
  defaultDifficulty: Difficulty;
  /** "Client personality" for job scenarios; overridden for topical themes. */
  personalityLabel?: string;
}) {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState<Difficulty>(defaultDifficulty);
  const [personality, setPersonality] = useState<Personality>("friendly");
  const [explanationLanguage, setExplanationLanguage] = useState<"none" | "bn">("none");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleStart() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenarioId, difficulty, personality, explanationLanguage }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not start the session.");
        return;
      }
      router.push(`/practice/${data.session.id}`);
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="text-base font-semibold text-foreground">Practice settings</h2>

      <div className="mt-4">
        <label className="mb-1 block text-sm font-medium text-muted-foreground">Difficulty</label>
        <div className="grid grid-cols-3 gap-2">
          {(["beginner", "intermediate", "advanced"] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setDifficulty(lvl)}
              className={`h-10 rounded-lg border text-sm font-medium capitalize transition ${
                difficulty === lvl
                  ? "border-brand bg-brand-muted text-brand"
                  : "border-border text-muted-foreground hover:border-brand/40"
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-sm font-medium text-muted-foreground">
          {personalityLabel ?? "Client personality"}
        </label>
        <select
          value={personality}
          onChange={(e) => setPersonality(e.target.value as Personality)}
          className="h-11 w-full rounded-xl border border-border px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
        >
          {PERSONALITIES.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-sm font-medium text-muted-foreground">Bangla explanations</label>
        <select
          value={explanationLanguage}
          onChange={(e) => setExplanationLanguage(e.target.value as "none" | "bn")}
          className="h-11 w-full rounded-xl border border-border px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
        >
          <option value="none">Off</option>
          <option value="bn">On</option>
        </select>
      </div>

      {error && <p className="mt-4 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-danger">{error}</p>}

      <button
        onClick={handleStart}
        disabled={loading}
        className="mt-5 h-11 w-full rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60"
      >
        {loading ? "Starting…" : "Start practice"}
      </button>
    </div>
  );
}
