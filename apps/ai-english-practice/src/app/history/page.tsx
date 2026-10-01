import Link from "next/link";
import { redirect } from "next/navigation";
import { desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { practiceSessions } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import { listScenariosForUser } from "@/server/scenarios/resolve";

export const dynamic = "force-dynamic";

export default async function HistoryPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!user.onboarded) redirect("/onboarding");

  const sessions = await getDb()
    .select()
    .from(practiceSessions)
    .where(eq(practiceSessions.userId, user.id))
    .orderBy(desc(practiceSessions.startedAt));

  const scenarioById = new Map((await listScenariosForUser(user.id)).map((s) => [s.id, s]));

  return (
    <AppShell>
      <h1 className="text-2xl font-semibold text-foreground">Practice history</h1>
      <p className="mt-1 text-sm text-muted-foreground">All your past and current sessions.</p>

      {sessions.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-border bg-card p-8 text-center">
          <p className="text-sm text-muted-foreground">No sessions yet.</p>
          <Link
            href="/scenarios"
            className="mt-3 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Browse scenarios
          </Link>
        </div>
      ) : (
        <ul className="mt-6 divide-y divide-border rounded-xl border border-border bg-card">
          {sessions.map((s) => {
            const scenario = scenarioById.get(s.scenarioId);
            return (
              <li key={s.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">{scenario?.title || s.scenarioId}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {new Date(s.startedAt).toLocaleString()} ·{" "}
                    <span className="capitalize">{s.difficulty}</span> · <span className="capitalize">{s.personality}</span> ·{" "}
                    <span className={s.status === "active" ? "text-brand" : "text-muted-foreground"}>{s.status}</span>
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
    </AppShell>
  );
}
