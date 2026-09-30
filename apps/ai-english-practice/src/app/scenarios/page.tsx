import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import { listScenariosForUser } from "@/server/scenarios/resolve";
import ScenarioBrowser from "@/components/scenarios/ScenarioBrowser";
import VoiceSelector from "@/components/scenarios/VoiceSelector";

export const dynamic = "force-dynamic";

export default async function ScenariosPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!user.onboarded) redirect("/onboarding");

  const scenarios = await listScenariosForUser(user.id);

  return (
    <AppShell>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Scenario library</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose a real freelance situation to practise. Each scenario has clear objectives and useful phrases.
          </p>
        </div>
        <Link
          href="/scenarios/new"
          className="whitespace-nowrap rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          + Create from a job post
        </Link>
      </div>
      <div className="mb-6"><VoiceSelector /></div>
      <ScenarioBrowser scenarios={scenarios} />
    </AppShell>
  );
}
