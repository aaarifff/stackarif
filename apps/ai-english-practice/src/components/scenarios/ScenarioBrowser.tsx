"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Difficulty, Scenario } from "@/lib/types";
import { SCENARIO_CATEGORIES } from "@/content/scenarios";

const DIFFICULTIES: (Difficulty | "all")[] = ["all", "beginner", "intermediate", "advanced"];
const PAGE_SIZE = 30;

export default function ScenarioBrowser({ scenarios }: { scenarios: Scenario[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [difficulty, setDifficulty] = useState<Difficulty | "all">("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return scenarios.filter((s) => {
      const matchesQuery =
        query.trim().length === 0 ||
        s.title.toLowerCase().includes(query.toLowerCase()) ||
        s.learnerGoal.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "all" || s.category === category;
      const matchesDifficulty = difficulty === "all" || s.difficultyDefault === difficulty;
      return matchesQuery && matchesCategory && matchesDifficulty;
    });
  }, [scenarios, query, category, difficulty]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  // Clamp so filters that shrink the result set never leave us on a missing page.
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  function resetFilters() {
    setQuery("");
    setCategory("all");
    setDifficulty("all");
    setPage(1);
  }

  function goToPage(next: number) {
    setPage(Math.min(Math.max(next, 1), totalPages));
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          placeholder="Search by title or skill…"
          aria-label="Search scenarios"
          className="h-11 w-full rounded-xl border border-border px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 sm:max-w-xs"
        />
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          aria-label="Filter by category"
          className="h-11 rounded-xl border border-border px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
        >
          <option value="all">All categories</option>
          {SCENARIO_CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
        <select
          value={difficulty}
          onChange={(e) => {
            setDifficulty(e.target.value as Difficulty | "all");
            setPage(1);
          }}
          aria-label="Filter by difficulty"
          className="h-11 rounded-xl border border-border px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
        >
          {DIFFICULTIES.map((d) => (
            <option key={d} value={d}>
              {d === "all" ? "All levels" : d.charAt(0).toUpperCase() + d.slice(1)}
            </option>
          ))}
        </select>
        <p
          className="text-sm text-muted-foreground sm:ml-auto sm:whitespace-nowrap"
          role="status"
          aria-live="polite"
        >
          {filtered.length} of {scenarios.length} scenarios
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-border bg-card p-8 text-center">
          <p className="text-sm text-muted-foreground">No scenarios match your search.</p>
          <button
            onClick={resetFilters}
            className="mt-3 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pageItems.map((s) => (
            <Link
              key={s.id}
              href={`/scenarios/${s.id}`}
              className="flex flex-col rounded-xl border border-border bg-card p-5 transition hover:border-brand/40 hover:shadow-sm"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="rounded-full bg-brand-muted px-2.5 py-1 text-xs font-semibold text-brand">
                    {s.categoryLabel}
                  </span>
                  {s.source === "custom" && (
                    <span className="rounded-full bg-warning-muted px-2.5 py-1 text-xs font-semibold text-warning">
                      Your scenario
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium capitalize text-muted-foreground">{s.difficultyDefault}</span>
              </div>
              <h3 className="mt-3 font-semibold text-foreground">{s.title}</h3>
              <p className="mt-1 flex-1 text-sm text-muted-foreground">{s.learnerGoal}</p>
              <p className="mt-3 text-xs font-medium text-muted-foreground">~{s.estimatedMinutes} min</p>
            </Link>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <nav
          className="mt-8 flex flex-wrap items-center justify-between gap-3"
          aria-label="Scenario pagination"
        >
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1}–{startIndex + pageItems.length} of {filtered.length}
          </p>
          <div className="flex flex-wrap items-center gap-1">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-background disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => goToPage(n)}
                aria-current={n === currentPage ? "page" : undefined}
                className={
                  n === currentPage
                    ? "rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground"
                    : "rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-background"
                }
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-background disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}
