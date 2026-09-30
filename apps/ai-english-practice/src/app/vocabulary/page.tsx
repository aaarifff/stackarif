import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import VocabularyManager from "@/components/vocabulary/VocabularyManager";

export const dynamic = "force-dynamic";

export default async function VocabularyPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!user.onboarded) redirect("/onboarding");

  return (
    <AppShell>
      <h1 className="text-2xl font-semibold text-foreground">Vocabulary notebook</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Save phrases from your practice sessions, then review them with simple flashcards.
      </p>
      <VocabularyManager />
    </AppShell>
  );
}
