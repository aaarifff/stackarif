"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { PRACTICE_LEVELS, PRACTICE_THEMES, getPracticeLevel, getPracticeTheme } from "@/content/themes";
import type { PracticeLevelId } from "@/content/themes";
import type { PracticeThemeId } from "@/lib/types";

const MIN_CHARS = 50;
const EXAMPLE =
  "We need a freelancer to build a Shopify store for our furniture business. About 80 products, we already have photos. We want online payments and a blog. Budget is tight and we need it finished in 3 weeks.";

type ThemeChoice = PracticeThemeId | "none";

export default function JobScenarioCreator({
  defaultLevel = "normal",
  explanationLanguage = "none",
}: {
  defaultLevel?: PracticeLevelId;
  explanationLanguage?: "none" | "bn";
}) {
  const router = useRouter();
  const [jobText, setJobText] = useState("");
  const [themeChoice, setThemeChoice] = useState<ThemeChoice>("none");
  const [levelId, setLevelId] = useState<PracticeLevelId>(defaultLevel);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const trimmedLength = jobText.trim().length;
  const tooShort = trimmedLength > 0 && trimmedLength < MIN_CHARS;
  const theme = getPracticeTheme(themeChoice);
  const level = getPracticeLevel(levelId) ?? PRACTICE_LEVELS[0];
  const canSubmit = theme ? true : trimmedLength >= MIN_CHARS;
  const buttonLabel = loading
    ? theme
      ? "Building your practice…"
      : "Creating your scenario…"
    : theme
      ? "Start practice"
      : "Create scenario";

  async function handleGenerate() {
    if (loading || !canSubmit) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/scenarios/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobText: theme ? "" : jobText,
          theme: theme?.id ?? null,
          level: level.id,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not create the scenario. Please try again.");
        return;
      }

      if (!theme) {
        // Job-post scenarios get their own review page, where personality is chosen.
        router.push(`/scenarios/${data.scenario.id}`);
        return;
      }

      // A theme already says what to practise, so go straight into the conversation.
      const sessionRes = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenarioId: data.scenario.id,
          difficulty: level.difficulty,
          personality: "friendly",
          explanationLanguage,
        }),
      });
      const sessionData = await sessionRes.json();
      if (!sessionRes.ok) {
        // The scenario exists either way, so let the learner start it manually.
        router.push(`/scenarios/${data.scenario.id}`);
        return;
      }
      router.push(`/practice/${sessionData.session.id}`);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
      {/* Left: what to practise */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div>
          <label htmlFor="practice-level" className="block text-sm font-medium text-foreground">
            English level
          </label>
          <select
            id="practice-level"
            value={levelId}
            onChange={(e) => setLevelId(e.target.value as PracticeLevelId)}
            disabled={loading}
            className="mt-2 h-11 w-full rounded-xl border border-border px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          >
            {PRACTICE_LEVELS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
          <p className="mt-1.5 text-xs text-muted-foreground">{level.blurb}</p>
        </div>

        <div className="mt-5">
          <label htmlFor="practice-content" className="block text-sm font-medium text-foreground">
            Content
          </label>
          <select
            id="practice-content"
            value={themeChoice}
            onChange={(e) => setThemeChoice(e.target.value as ThemeChoice)}
            disabled={loading}
            className="mt-2 h-11 w-full rounded-xl border border-border px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          >
            <option value="none">Job post (paste below)</option>
            {PRACTICE_THEMES.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
          <p className="mt-1.5 text-xs text-muted-foreground">
            {theme ? theme.blurb : "Pick a topic to practise, or paste a real job post instead."}
          </p>
        </div>
      </div>

      {/* Right: the source material */}
      <div className="rounded-xl border border-border bg-card p-6">
        {theme ? (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand">{theme.categoryLabel}</p>
            <h2 className="mt-1 text-lg font-semibold text-foreground">{theme.label} practice</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We&apos;ll build a {level.label.toLowerCase()}-level conversation on this topic, with its own partner,
              objectives and vocabulary, then drop you straight into the practice room.
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {theme.blurb}
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                Level: {level.label} — {level.blurb}
              </li>
            </ul>
          </div>
        ) : (
          <>
            <label htmlFor="job-text" className="text-sm font-medium text-foreground">
              Paste a job description
            </label>
            <p className="mt-1 text-sm text-muted-foreground">
              Copy a posting from Upwork, Freelancer, or anywhere else. We&apos;ll turn it into a practice scenario with
              a client persona, objectives, and useful vocabulary.
            </p>

            <textarea
              id="job-text"
              value={jobText}
              onChange={(e) => setJobText(e.target.value)}
              rows={10}
              disabled={loading}
              placeholder={EXAMPLE}
              className="mt-3 w-full rounded-xl border border-border p-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:bg-background"
            />

            <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
              <p className={`text-xs ${tooShort ? "text-warning" : "text-muted-foreground"}`}>
                {tooShort
                  ? `Add a little more detail — ${MIN_CHARS - trimmedLength} more characters needed.`
                  : `${jobText.length} characters. Contact details and links are ignored.`}
              </p>
              <button
                type="button"
                onClick={() => setJobText(EXAMPLE)}
                disabled={loading}
                className="text-xs font-medium text-brand hover:underline disabled:opacity-50"
              >
                Use an example
              </button>
            </div>
          </>
        )}

        {error && (
          <p role="alert" className="mt-3 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-danger">
            {error}
          </p>
        )}

        <button
          onClick={handleGenerate}
          disabled={loading || !canSubmit}
          className="mt-4 h-11 w-full rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60"
        >
          {buttonLabel}
        </button>

        {loading && (
          <p className="mt-2 text-center text-xs text-muted-foreground">
            This usually takes a few seconds. Please keep this tab open.
          </p>
        )}

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Prefer ready-made practice?{" "}
          <Link href="/scenarios" className="font-medium text-brand hover:underline">
            Browse the scenario library
          </Link>
        </p>
      </div>
    </div>
  );
}
