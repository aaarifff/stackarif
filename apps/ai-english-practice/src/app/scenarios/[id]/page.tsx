import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import { resolveScenarioForUser } from "@/server/scenarios/resolve";
import { DEMOS } from "@/content/demos";
import DemoPlayer from "@/components/scenarios/DemoPlayer";
import StartPracticeForm from "@/components/scenarios/StartPracticeForm";
import VoiceSelector from "@/components/scenarios/VoiceSelector";

export const dynamic = "force-dynamic";

export default async function ScenarioDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!user.onboarded) redirect("/onboarding");

  const { id } = await params;
  const scenario = await resolveScenarioForUser(user.id, id);
  if (!scenario) notFound();

  // Theme scenarios are topical conversations, not client work.
  const partnerHeading = scenario.theme ? "Your practice partner" : "Client persona";
  const partnerLabel = scenario.theme ? "Partner" : "Client";
  const learnerLabel = scenario.theme ? "You" : "Freelancer";

  const demo = DEMOS.find((d) => d.relatedScenarioId === scenario.id) ?? {
    id: `DEMO-${scenario.id}`,
    category: scenario.category,
    title: scenario.title,
    description: scenario.learnerGoal,
    relatedScenarioId: scenario.id,
    turns: scenario.sampleDialogue,
  };

  return (
    <AppShell>
      <Link href="/scenarios" className="text-sm font-medium text-brand hover:underline">
        ← Back to scenarios
      </Link>

      <div className="mt-4 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <VoiceSelector />
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-brand-muted px-2.5 py-1 text-xs font-semibold text-brand">
                {scenario.categoryLabel}
              </span>
              {scenario.source === "custom" && (
                <span className="rounded-full bg-warning-muted px-2.5 py-1 text-xs font-semibold text-warning">
                  Your scenario
                </span>
              )}
              <span className="text-xs font-medium capitalize text-muted-foreground">
                {scenario.difficultyDefault} · ~{scenario.estimatedMinutes} min
              </span>
            </div>
            <h1 className="mt-3 text-2xl font-semibold text-foreground">{scenario.title}</h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{scenario.brief}</p>

            <div className="mt-4 rounded-lg bg-background p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{partnerHeading}</p>
              <p className="mt-1 text-sm text-foreground">
                {scenario.persona.name} · {scenario.persona.role} at {scenario.persona.business}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Traits: {scenario.persona.traits.join(", ")}</p>
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Your objectives</p>
              <ul className="mt-2 space-y-1.5">
                {scenario.objectives.map((o) => (
                  <li key={o} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>

            {scenario.source === "custom" && scenario.sourceText && (
              <details className="mt-4 rounded-lg border border-border bg-background p-4">
                <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Based on the job post you pasted
                </summary>
                <p className="mt-2 whitespace-pre-wrap text-xs leading-relaxed text-muted-foreground">
                  {scenario.sourceText}
                </p>
              </details>
            )}

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Useful vocabulary</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {scenario.vocabulary.map((v) => (
                  <span
                    key={v.phrase}
                    title={v.meaning}
                    className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {v.phrase}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {demo && <DemoPlayer demo={demo} partnerLabel={partnerLabel} learnerLabel={learnerLabel} />}
        </div>

        <div className="space-y-6">
          <StartPracticeForm
            scenarioId={scenario.id}
            defaultDifficulty={scenario.difficultyDefault}
            personalityLabel={scenario.theme ? "Partner's tone" : undefined}
          />
        </div>
      </div>
    </AppShell>
  );
}
