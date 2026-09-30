import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";
import ThemeToggle from "@/components/ThemeToggle";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/scenarios", label: "Scenarios" },
  { href: "/history", label: "History" },
  { href: "/vocabulary", label: "Vocabulary" },
  { href: "/settings", label: "Settings" },
];

export default async function AppShell({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link
            href={user ? "/dashboard" : "/"}
            className="flex shrink-0 items-center gap-2 font-semibold text-foreground"
          >
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
              CT
            </span>
            <span className="hidden sm:inline">ClientTalk</span>
          </Link>
          {user ? (
            <nav className="flex min-w-0 flex-1 items-center justify-end gap-1 sm:gap-2">
              <div className="scrollbar-thin -mx-1 flex min-w-0 items-center gap-1 overflow-x-auto px-1 sm:gap-2">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-brand-muted hover:text-brand"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              {/* Outside the scroll area so it stays reachable on narrow screens. */}
              <ThemeToggle />
              <LogoutButton />
            </nav>
          ) : (
            <div className="flex shrink-0 items-center gap-2">
              <ThemeToggle />
              <Link
                href="/login"
                className="whitespace-nowrap rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
              >
                Sign in
              </Link>
            </div>
          )}
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
    </div>
  );
}
