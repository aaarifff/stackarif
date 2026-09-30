"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

const INTERESTS = [
  { id: "website", label: "Website development" },
  { id: "google-ads", label: "Google Ads" },
  { id: "tracking", label: "Tracking & analytics" },
  { id: "meta-ads", label: "Meta Ads" },
  { id: "tiktok-ads", label: "TikTok Ads" },
  { id: "reporting", label: "Reporting" },
];

export default function OnboardingForm({
  initial,
}: {
  initial: {
    displayName: string;
    level: "beginner" | "intermediate" | "advanced";
    explanationLanguage: "none" | "bn";
    interests: string[];
    dailyGoalMinutes: number;
  };
}) {
  const router = useRouter();
  const [displayName, setDisplayName] = useState(initial.displayName || "");
  const [level, setLevel] = useState(initial.level);
  const [explanationLanguage, setExplanationLanguage] = useState(initial.explanationLanguage);
  const [interests, setInterests] = useState<string[]>(initial.interests.length ? initial.interests : ["website", "google-ads"]);
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState(initial.dailyGoalMinutes || 10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleInterest(id: string) {
    setInterests((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: displayName || undefined,
          level,
          explanationLanguage,
          interests,
          dailyGoalMinutes,
          onboarded: true,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Could not save your preferences.");
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
      <div>
        <label className="mb-1 block text-sm font-medium text-muted-foreground">Display name</label>
        <input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="h-11 w-full rounded-xl border border-border px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-muted-foreground">Your level</label>
        <div className="grid grid-cols-3 gap-2">
          {(["beginner", "intermediate", "advanced"] as const).map((lvl) => (
            <button
              type="button"
              key={lvl}
              onClick={() => setLevel(lvl)}
              className={`h-10 rounded-lg border text-sm font-medium capitalize transition ${
                level === lvl
                  ? "border-brand bg-brand-muted text-brand"
                  : "border-border text-muted-foreground hover:border-brand/40"
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-muted-foreground">Interests</label>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((interest) => (
            <button
              type="button"
              key={interest.id}
              onClick={() => toggleInterest(interest.id)}
              className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                interests.includes(interest.id)
                  ? "border-brand bg-brand-muted text-brand"
                  : "border-border text-muted-foreground hover:border-brand/40"
              }`}
            >
              {interest.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
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
        <div>
          <label className="mb-1 block text-sm font-medium text-muted-foreground">Daily goal (minutes)</label>
          <input
            type="number"
            min={5}
            max={60}
            value={dailyGoalMinutes}
            onChange={(e) => setDailyGoalMinutes(Number(e.target.value))}
            className="h-11 w-full rounded-xl border border-border px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </div>
      </div>

      {error && <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-danger">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="h-11 w-full rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60"
      >
        {loading ? "Saving…" : "Start practising"}
      </button>
    </form>
  );
}
