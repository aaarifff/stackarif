import Link from "next/link";
import { redirect } from "next/navigation";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { practiceSessions, reviews, vocabularyItems } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import { SCENARIOS } from "@/content/scenarios";
import { listScenariosForUser } from "@/server/scenarios/resolve";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!user.onboarded) redirect("/onboarding");

  const sessions = await db
    .select()
    .from(practiceSessions)
    .where(eq(practiceSessions.userId, user.id))
    .orderBy(desc(practiceSessions.startedAt))
    .limit(50);

  const scenarioById = new Map((await listScenariosForUser(user.id)).map((s) => [s.id, s]));

  const completedSessions = sessions.filter((s) => s.status === "ended");
  const activeSession = sessions.find((s) => s.status === "active");

  const totalPracticeMinutes = completedSessions.reduce((sum, s) => {
    if (!s.endedAt) return sum;
    return sum + Math.max(0, (s.endedAt.getTime() - s.startedAt.getTime()) / 60000);
  }, 0);

  const speakingMinutes = sessions.reduce((sum, s) => sum + (s.speakingMs || 0), 0) / 60000;

  const vocabCount = await db
    .select()
    .from(vocabularyItems)
    .where(eq(vocabularyItems.userId, user.id));

  const reviewRows = completedSessions.length
    ? await db.select().from(reviews)
    : [];
  const userReviewSessionIds = new Set(completedSessions.map((s) => s.id));
  const userReviews = reviewRows.filter((r) => userReviewSessionIds.has(r.sessionId));
  const objectivesTotal = userReviews.reduce((sum, r) => sum + ((r.objectives as unknown[])?.length || 0), 0);
  const objectivesDone = userReviews.reduce(
    (sum, r) => sum + ((r.objectives as { completed: boolean }[])?.filter((o) => o.completed).length || 0),
    0,
  );

  const attemptedScenarioIds = new Set(sessions.map((s) => s.scenarioId));
  const interests = (user.interests as string[]) || [];
  const recommended =
    SCENARIOS.find((s) => interests.includes(s.category) && !attemptedScenarioIds.has(s.id)) ||
    SCENARIOS.find((s) => !attemptedScenarioIds.has(s.id)) ||
    SCENARIOS[0];

  return (
    <AppShell>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Welcome back{user.displayName ? `, ${user.displayName}` : ""}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Daily goal: {user.dailyGoalMinutes} minutes · Level: <span className="capitalize">{user.level}</span>
          </p>
        </div>

        {activeSession && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-brand/30 bg-brand-muted p-4">
            <div>
              <p className="text-sm font-semibold text-brand">You have a session in progress</p>
              <p className="text-sm text-brand">
                {scenarioById.get(activeSession.scenarioId)?.title || activeSession.scenarioId}
              </p>
            </div>
            <Link
              href={`/practice/${activeSession.id}`}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Continue session
            </Link>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-4">
          <StatCard label="Completed sessions" value={completedSessions.length.toString()} />
          <StatCard label="Practice minutes" value={Math.round(totalPracticeMinutes).toString()} />
          <StatCard label="Speaking minutes" value={speakingMinutes.toFixed(1)} />
          <StatCard label="Saved phrases" value={vocabCount.length.toString()} />
        </div>

        {objectivesTotal > 0 && (
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground">Objective progress</p>
              <p className="text-sm text-muted-foreground">
                {objectivesDone}/{objectivesTotal} completed
              </p>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${objectivesTotal ? Math.round((objectivesDone / objectivesTotal) * 100) : 0}%` }}
              />
            </div>
          </div>
        )}

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand">Recommended next</p>
              <h2 className="mt-1 text-lg font-semibold text-foreground">{recommended.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{recommended.situation}</p>
            </div>
            <Link
              href={`/scenarios/${recommended.id}`}
              className="whitespace-nowrap rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Start scenario
            </Link>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Recent sessions</h2>
            <Link href="/history" className="text-sm font-medium text-brand hover:underline">
              View all
            </Link>
          </div>
          {sessions.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">
              You haven't practised yet.{" "}
              <Link href="/scenarios" className="font-medium text-brand hover:underline">
                Browse scenarios
              </Link>{" "}
              to get started.
            </p>
          ) : (
            <ul className="mt-3 divide-y divide-border rounded-xl border border-border bg-card">
              {sessions.slice(0, 5).map((s) => {
                const scenario = scenarioById.get(s.scenarioId);
                return (
                  <li key={s.id} className="flex items-center justify-between gap-3 px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{scenario?.title || s.scenarioId}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(s.startedAt).toLocaleDateString()} · {s.status} · {s.difficulty}
                      </p>
                    </div>
                    <Link
                      href={s.status === "active" ? `/practice/${s.id}` : `/sessions/${s.id}/review`}
                      className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:border-brand/40 hover:text-brand"
                    >
                      {s.status === "active" ? "Continue" : "View review"}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </AppShell>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-2xl font-semibold text-foreground">{value}</p>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
    </div>
  );
}
