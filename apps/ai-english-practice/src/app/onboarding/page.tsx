import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import OnboardingForm from "@/components/OnboardingForm";
import ThemeToggle from "@/components/ThemeToggle";

export const dynamic = "force-dynamic";

export default async function OnboardingPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="grid min-h-screen place-items-center bg-background px-4 py-10">
      <div className="fixed right-4 top-4 z-10">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-8 shadow-card">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">Step 1 of 1</p>
        <h1 className="mt-1 text-2xl font-semibold text-foreground">Set up your practice</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          These settings personalize your AI client and can be changed anytime in Settings.
        </p>
        <OnboardingForm
          initial={{
            displayName: user.displayName,
            level: user.level as "beginner" | "intermediate" | "advanced",
            explanationLanguage: user.explanationLanguage as "none" | "bn",
            interests: (user.interests as string[]) || [],
            dailyGoalMinutes: user.dailyGoalMinutes,
          }}
        />
      </div>
    </div>
  );
}
