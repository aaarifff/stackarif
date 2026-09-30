import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import { ForbiddenError, getFullSession, NotFoundError } from "@/server/services/sessionService";
import SessionActions from "@/components/practice/SessionActions";

export const dynamic = "force-dynamic";

const SCORE_LABELS: Record<string, string> = {
  clarity: "Clarity",
  grammar: "Grammar",
  vocabulary: "Vocabulary",
  professionalTone: "Professional tone",
  objectiveCompletion: "Objective completion",
};

export default async function ReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const { id } = await params;
  let data;
  try {
    data = await getFullSession(id, user.id);
  } catch (err) {
    if (err instanceof NotFoundError || err instanceof ForbiddenError) notFound();
    throw err;
  }
  if (!data.scenario) notFound();

  const { scenario, review, session } = data;
  const learnerTurns = data.messages.filter((m) => m.role === "user").length;

  return (
    <AppShell>
      <Link href="/history" className="text-sm font-medium text-brand hover:underline">
        ← Back to history
      </Link>

      <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand">{scenario.categoryLabel}</p>
            <h1 className="mt-1 text-2xl font-semibold text-foreground">{scenario.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {session.status === "active" ? "Review in progress" : "Session complete"} ·{" "}
              {new Date(session.startedAt).toLocaleString()}
            </p>
          </div>

          {!review ? (
            <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
              Review is not available yet. It is generated automatically once you end the session.
            </div>
          ) : (
            <>
              {learnerTurns === 0 && (
                <div className="rounded-lg bg-warning-muted px-4 py-3 text-sm text-warning">
                  You ended this session before replying, so there isn't enough evidence for detailed feedback yet.
                </div>
              )}

              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-base font-semibold text-foreground">Practice rubric</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  AI learning feedback, not a certified English proficiency assessment.
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {Object.entries(review.scores as Record<string, number | null>).map(([key, value]) => (
                    <div key={key} className="rounded-lg border border-border p-3">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{SCORE_LABELS[key] || key}</p>
                      <p className="mt-1 text-lg font-semibold text-foreground">
                        {value === null || value === undefined ? "Insufficient evidence" : `${value} / 5`}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h2 className="text-base font-semibold text-foreground">Strengths</h2>
                  <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                    {(review.strengths as string[]).length === 0 && <li className="text-muted-foreground">None recorded.</li>}
                    {(review.strengths as string[]).map((s, i) => (
                      <li key={i}>• {s}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-border bg-card p-6">
                  <h2 className="text-base font-semibold text-foreground">Improvements (up to 3)</h2>
                  <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                    {(review.improvements as string[]).length === 0 && <li className="text-muted-foreground">None recorded.</li>}
                    {(review.improvements as string[]).map((s, i) => (
                      <li key={i}>• {s}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-base font-semibold text-foreground">Objectives</h2>
                <ul className="mt-3 space-y-2">
                  {(review.objectives as { objective: string; completed: boolean; evidence: string | null }[]).map(
                    (o, i) => (
                      <li key={i} className="rounded-lg border border-border p-3 text-sm">
                        <p className={o.completed ? "font-medium text-success" : "font-medium text-muted-foreground"}>
                          {o.completed ? "✓" : "○"} {o.objective}
                        </p>
                        {o.evidence && <p className="mt-1 text-xs italic text-muted-foreground">“{o.evidence}”</p>}
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-base font-semibold text-foreground">Useful phrases</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(review.usefulPhrases as string[]).map((p, i) => (
                    <span key={i} className="rounded-full bg-brand-muted px-3 py-1 text-xs font-medium text-brand">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {review.recommendedScenarioId && (
                <div className="flex items-center justify-between rounded-xl border border-brand/30 bg-brand-muted p-5">
                  <p className="text-sm font-medium text-brand">Recommended next scenario</p>
                  <Link
                    href={`/scenarios/${review.recommendedScenarioId}`}
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                  >
                    View scenario
                  </Link>
                </div>
              )}
            </>
          )}
        </div>

        <SessionActions sessionId={session.id} status={session.status} />
      </div>
    </AppShell>
  );
}
