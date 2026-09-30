import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import ThemeToggle from "@/components/ThemeToggle";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const user = await getCurrentUser();
  if (user) {
    redirect(user.onboarded ? "/dashboard" : "/onboarding");
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6">
        <div className="flex items-center gap-2 font-semibold text-foreground">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
            CT
          </span>
          ClientTalk
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <Link
            href="/login"
            className="whitespace-nowrap rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            Sign in
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">
            Practice English for freelance clients
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            Talk to an AI client. Get three reply ideas. Speak with confidence.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Rehearse real freelance conversations — discovery calls, ad reports, scope changes, and
            more — with an AI client that speaks back. After every message, you get exactly three
            useful reply ideas: a direct answer, a clarifying question, and a next step.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/login"
              className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
            >
              Start practising — it's free
            </Link>
            <Link
              href="/login"
              className="rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold text-muted-foreground transition hover:border-brand/40 hover:text-brand"
            >
              I already have an account
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Example conversation</p>
          <div className="mt-4 space-y-3">
            <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-muted px-4 py-3 text-sm text-foreground">
              I spent $1,000 and got 20 leads this month. Is that a good result?
            </div>
            <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-4 py-3 text-sm text-primary-foreground">
              How many of those leads became customers, and what cost per lead were you aiming for?
            </div>
          </div>
          <div className="mt-5 rounded-xl border border-brand/20 bg-brand-muted p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand">Three reply ideas</p>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li>
                <span className="font-semibold text-foreground">Direct: </span>
                The cost per lead was $50. Whether that's good depends on lead quality and your target.
              </li>
              <li>
                <span className="font-semibold text-foreground">Clarify: </span>
                How many leads turned into paying customers?
              </li>
              <li>
                <span className="font-semibold text-foreground">Next step: </span>
                Let's review lead quality together before deciding on the budget.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { title: "24 real scenarios", body: "Website discovery, scope, Google/Meta/TikTok Ads, tracking, and reporting." },
            { title: "Speak or type", body: "Press-to-record voice practice with an editable transcript, or type your reply." },
            { title: "Coaching, kept separate", body: "Grammar and clarity feedback lives in its own panel, never mixed into the roleplay." },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-semibold text-foreground">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
