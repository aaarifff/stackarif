import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import JobScenarioCreator from "@/components/scenarios/JobScenarioCreator";
import { levelForDifficulty } from "@/content/themes";

export const dynamic = "force-dynamic";

export default async function NewScenarioPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!user.onboarded) redirect("/onboarding");

  return (
    <AppShell>
      <Link href="/scenarios" className="text-sm font-medium text-brand hover:underline">
        ← Back to scenarios
      </Link>

      <div className="mb-6 mt-4">
        <h1 className="text-2xl font-semibold text-foreground">Start a new practice</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose your English level, then pick a topic to practise — or paste a real job post and we&apos;ll build a
          client conversation from it.
        </p>
      </div>

      <JobScenarioCreator
        defaultLevel={levelForDifficulty(user.level)}
        explanationLanguage={user.explanationLanguage === "bn" ? "bn" : "none"}
      />
    </AppShell>
  );
}
