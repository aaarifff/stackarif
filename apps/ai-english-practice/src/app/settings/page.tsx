import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import SettingsForm from "@/components/settings/SettingsForm";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <AppShell>
      <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
      <p className="mt-1 text-sm text-muted-foreground">Update your practice preferences and manage your data.</p>
      <SettingsForm
        initial={{
          displayName: user.displayName,
          level: user.level as "beginner" | "intermediate" | "advanced",
          explanationLanguage: user.explanationLanguage as "none" | "bn",
          interests: (user.interests as string[]) || [],
          dailyGoalMinutes: user.dailyGoalMinutes,
          email: user.email,
        }}
      />
    </AppShell>
  );
}
