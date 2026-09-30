"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const INTERESTS = [
  { id: "website", label: "Website development" },
  { id: "google-ads", label: "Google Ads" },
  { id: "tracking", label: "Tracking & analytics" },
  { id: "meta-ads", label: "Meta Ads" },
  { id: "tiktok-ads", label: "TikTok Ads" },
  { id: "reporting", label: "Reporting" },
];

export default function SettingsForm({
  initial,
}: {
  initial: {
    displayName: string;
    level: "beginner" | "intermediate" | "advanced";
    explanationLanguage: "none" | "bn";
    interests: string[];
    dailyGoalMinutes: number;
    email: string;
  };
}) {
  const router = useRouter();
  const [displayName, setDisplayName] = useState(initial.displayName);
  const [level, setLevel] = useState(initial.level);
  const [explanationLanguage, setExplanationLanguage] = useState(initial.explanationLanguage);
  const [interests, setInterests] = useState<string[]>(initial.interests);
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState(initial.dailyGoalMinutes);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  function toggleInterest(id: string) {
    setInterests((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName, level, explanationLanguage, interests, dailyGoalMinutes }),
      });
      setMessage(res.ok ? "Preferences saved." : "Could not save preferences.");
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteAccount() {
    setDeleting(true);
    try {
      const res = await fetch("/api/settings", { method: "DELETE" });
      if (res.ok) {
        router.push("/");
        router.refresh();
      }
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="mt-6 max-w-xl space-y-6">
      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Account</p>
        <p className="mt-1 text-sm text-muted-foreground">{initial.email}</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-muted-foreground">Display name</label>
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="h-11 w-full rounded-xl border border-border px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-muted-foreground">Level</label>
          <div className="grid grid-cols-3 gap-2">
            {(["beginner", "intermediate", "advanced"] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevel(lvl)}
                className={`h-10 rounded-lg border text-sm font-medium capitalize transition ${
                  level === lvl ? "border-brand bg-brand-muted text-brand" : "border-border text-muted-foreground"
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
                key={interest.id}
                onClick={() => toggleInterest(interest.id)}
                className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                  interests.includes(interest.id)
                    ? "border-brand bg-brand-muted text-brand"
                    : "border-border text-muted-foreground"
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

        {message && <p className="text-sm text-muted-foreground">{message}</p>}

        <button
          onClick={handleSave}
          disabled={saving}
          className="h-11 w-full rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save preferences"}
        </button>
      </div>

      <div className="rounded-xl border border-danger/30 bg-destructive/10 p-6">
        <p className="text-sm font-semibold text-danger">Danger zone</p>
        <p className="mt-1 text-xs text-danger">
          Deleting your account permanently removes your sessions, messages, reviews, and vocabulary.
        </p>
        {!confirmDelete ? (
          <button
            onClick={() => setConfirmDelete(true)}
            className="mt-3 rounded-lg border border-danger/40 bg-card px-4 py-2 text-sm font-semibold text-danger hover:bg-destructive/15"
          >
            Delete my account
          </button>
        ) : (
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => setConfirmDelete(false)}
              className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-muted-foreground"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteAccount}
              disabled={deleting}
              className="rounded-lg bg-destructive px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {deleting ? "Deleting…" : "Yes, delete everything"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
