"use client";

import { useEffect, useMemo, useState } from "react";

interface VocabItem {
  id: string;
  phrase: string;
  meaning: string;
  meaningBn: string | null;
  topic: string | null;
  example: string | null;
  practiced: boolean;
  lastReviewedAt: string | null;
  createdAt: string;
}

export default function VocabularyManager() {
  const [items, setItems] = useState<VocabItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"list" | "review">("list");
  const [reviewIndex, setReviewIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState({ phrase: "", meaning: "", meaningBn: "", example: "" });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/vocabulary");
      const data = await res.json();
      setItems(data.items || []);
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(
    () =>
      items.filter(
        (i) =>
          query.trim().length === 0 ||
          i.phrase.toLowerCase().includes(query.toLowerCase()) ||
          i.meaning.toLowerCase().includes(query.toLowerCase()),
      ),
    [items, query],
  );

  const reviewQueue = useMemo(() => {
    const unseen = items.filter((i) => !i.lastReviewedAt);
    const seen = items
      .filter((i) => i.lastReviewedAt)
      .sort((a, b) => new Date(a.lastReviewedAt!).getTime() - new Date(b.lastReviewedAt!).getTime());
    return [...unseen, ...seen];
  }, [items]);

  async function handleAdd() {
    if (!form.phrase.trim()) return;
    const res = await fetch("/api/vocabulary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phrase: form.phrase.trim(),
        meaning: form.meaning.trim(),
        meaningBn: form.meaningBn.trim() || null,
        example: form.example.trim() || null,
      }),
    });
    if (res.ok) {
      setForm({ phrase: "", meaning: "", meaningBn: "", example: "" });
      setShowAddForm(false);
      load();
    }
  }

  async function handleDelete(id: string) {
    await fetch(`/api/vocabulary/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  async function handleUpdate(id: string, updates: Partial<VocabItem>) {
    const res = await fetch(`/api/vocabulary/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (res.ok) {
      const data = await res.json();
      setItems((prev) => prev.map((i) => (i.id === id ? data.item : i)));
    }
  }

  async function markReviewed(id: string) {
    await handleUpdate(id, { markReviewed: true } as unknown as Partial<VocabItem>);
  }

  function nextReviewCard() {
    setRevealed(false);
    setReviewIndex((i) => Math.min(i + 1, reviewQueue.length - 1));
  }

  if (loading) {
    return <p className="mt-6 text-sm text-muted-foreground">Loading your vocabulary…</p>;
  }

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setMode("list")}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium ${mode === "list" ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"}`}
        >
          Notebook
        </button>
        <button
          onClick={() => {
            setMode("review");
            setReviewIndex(0);
            setRevealed(false);
          }}
          disabled={items.length === 0}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium disabled:opacity-50 ${mode === "review" ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"}`}
        >
          Review cards
        </button>
        <button
          onClick={() => setShowAddForm((v) => !v)}
          className="ml-auto rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-muted-foreground hover:border-brand/40 hover:text-brand"
        >
          {showAddForm ? "Cancel" : "+ Add word"}
        </button>
      </div>

      {showAddForm && (
        <div className="mt-4 grid gap-2 rounded-xl border border-border bg-card p-4 sm:grid-cols-2">
          <input
            placeholder="Phrase"
            value={form.phrase}
            onChange={(e) => setForm({ ...form, phrase: e.target.value })}
            className="h-10 rounded-lg border border-border px-3 text-sm"
          />
          <input
            placeholder="Meaning"
            value={form.meaning}
            onChange={(e) => setForm({ ...form, meaning: e.target.value })}
            className="h-10 rounded-lg border border-border px-3 text-sm"
          />
          <input
            placeholder="Bangla meaning (optional)"
            value={form.meaningBn}
            onChange={(e) => setForm({ ...form, meaningBn: e.target.value })}
            className="h-10 rounded-lg border border-border px-3 text-sm"
          />
          <input
            placeholder="Example sentence (optional)"
            value={form.example}
            onChange={(e) => setForm({ ...form, example: e.target.value })}
            className="h-10 rounded-lg border border-border px-3 text-sm"
          />
          <button
            onClick={handleAdd}
            className="sm:col-span-2 h-10 rounded-lg bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Save word
          </button>
        </div>
      )}

      {mode === "list" ? (
        <div className="mt-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your vocabulary…"
            className="h-11 w-full max-w-sm rounded-xl border border-border px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
          {filtered.length === 0 ? (
            <p className="mt-6 text-sm text-muted-foreground">No saved phrases yet. Save phrases during practice sessions.</p>
          ) : (
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {filtered.map((item) => (
                <VocabCard
                  key={item.id}
                  item={item}
                  editing={editingId === item.id}
                  onEditToggle={() => setEditingId(editingId === item.id ? null : item.id)}
                  onUpdate={(updates) => handleUpdate(item.id, updates)}
                  onDelete={() => handleDelete(item.id)}
                />
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div className="mt-6 grid place-items-center">
          {reviewQueue.length === 0 ? (
            <p className="text-sm text-muted-foreground">Add some words first.</p>
          ) : (
            <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Card {reviewIndex + 1} of {reviewQueue.length}
              </p>
              <p className="mt-4 text-2xl font-semibold text-foreground">{reviewQueue[reviewIndex].phrase}</p>
              {revealed ? (
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-muted-foreground">{reviewQueue[reviewIndex].meaning || "No meaning saved."}</p>
                  {reviewQueue[reviewIndex].meaningBn && (
                    <p className="text-sm text-muted-foreground">বাংলা: {reviewQueue[reviewIndex].meaningBn}</p>
                  )}
                  <p className="text-xs italic text-muted-foreground">Now try making your own sentence with this phrase.</p>
                </div>
              ) : (
                <button
                  onClick={() => setRevealed(true)}
                  className="mt-4 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-muted-foreground hover:border-brand/40"
                >
                  Reveal meaning
                </button>
              )}
              <div className="mt-6 flex justify-center gap-2">
                <button
                  onClick={() => {
                    markReviewed(reviewQueue[reviewIndex].id);
                    nextReviewCard();
                  }}
                  className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Got it, next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function VocabCard({
  item,
  editing,
  onEditToggle,
  onUpdate,
  onDelete,
}: {
  item: VocabItem;
  editing: boolean;
  onEditToggle: () => void;
  onUpdate: (updates: Partial<VocabItem>) => void;
  onDelete: () => void;
}) {
  const [meaning, setMeaning] = useState(item.meaning);

  return (
    <li className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold text-foreground">{item.phrase}</p>
          {!editing ? (
            <p className="mt-1 text-sm text-muted-foreground">{item.meaning || "No meaning saved."}</p>
          ) : (
            <input
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
              className="mt-1 h-9 w-full rounded-lg border border-border px-2 text-sm"
            />
          )}
          {item.meaningBn && <p className="mt-1 text-xs text-muted-foreground">বাংলা: {item.meaningBn}</p>}
          {item.example && <p className="mt-1 text-xs italic text-muted-foreground">"{item.example}"</p>}
        </div>
        <label className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <input
            type="checkbox"
            checked={item.practiced}
            onChange={(e) => onUpdate({ practiced: e.target.checked })}
          />
          Practised
        </label>
      </div>
      <div className="mt-3 flex gap-2 text-xs font-medium">
        {editing ? (
          <button
            onClick={() => {
              onUpdate({ meaning });
              onEditToggle();
            }}
            className="text-brand hover:underline"
          >
            Save
          </button>
        ) : (
          <button onClick={onEditToggle} className="text-brand hover:underline">
            Edit
          </button>
        )}
        <button onClick={onDelete} className="text-danger hover:underline">
          Delete
        </button>
      </div>
    </li>
  );
}
