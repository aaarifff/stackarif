"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function SessionActions({ sessionId, status }: { sessionId: string; status: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/sessions/${sessionId}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/history");
        router.refresh();
      }
    } finally {
      setDeleting(false);
    }
  }

  return (
    <aside className="h-fit space-y-3 rounded-xl border border-border bg-card p-5">
      <p className="text-sm font-semibold text-foreground">Session actions</p>
      {status === "active" && (
        <Link
          href={`/practice/${sessionId}`}
          className="block rounded-lg bg-primary px-4 py-2 text-center text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Resume session
        </Link>
      )}
      <a
        href={`/api/sessions/${sessionId}/export`}
        className="block rounded-lg border border-border px-4 py-2 text-center text-sm font-semibold text-muted-foreground hover:border-brand/40 hover:text-brand"
      >
        Export as Markdown
      </a>

      {!confirmOpen ? (
        <button
          onClick={() => setConfirmOpen(true)}
          className="block w-full rounded-lg border border-danger/30 px-4 py-2 text-center text-sm font-semibold text-danger hover:bg-destructive/10"
        >
          Delete session
        </button>
      ) : (
        <div className="rounded-lg border border-danger/30 bg-destructive/10 p-3">
          <p className="text-xs text-danger">
            This permanently deletes the transcript, feedback, and suggestions for this session.
          </p>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => setConfirmOpen(false)}
              className="flex-1 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex-1 rounded-lg bg-destructive px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
            >
              {deleting ? "Deleting…" : "Confirm delete"}
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
