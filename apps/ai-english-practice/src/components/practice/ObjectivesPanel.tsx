"use client";

export default function ObjectivesPanel({
  objectives,
  completed,
  vocabulary,
  onSaveVocab,
}: {
  objectives: string[];
  completed: Set<string>;
  vocabulary: { phrase: string; meaning: string }[];
  onSaveVocab: (phrase: string, meaning: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-card p-4">
        <p className="text-sm font-semibold text-foreground">Objectives</p>
        <ul className="mt-2 space-y-2">
          {objectives.map((o) => {
            const done = completed.has(o);
            return (
              <li key={o} className="flex items-start gap-2 text-sm">
                <span
                  aria-hidden
                  className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] ${
                    done ? "border-primary bg-primary text-primary-foreground" : "border-border text-transparent"
                  }`}
                >
                  ✓
                </span>
                <span className={done ? "text-muted-foreground line-through" : "text-muted-foreground"}>{o}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <p className="text-sm font-semibold text-foreground">Useful phrases</p>
        <ul className="mt-2 space-y-2">
          {vocabulary.map((v) => (
            <li key={v.phrase} className="flex items-start justify-between gap-2 text-sm">
              <div>
                <p className="font-medium text-foreground">{v.phrase}</p>
                <p className="text-xs text-muted-foreground">{v.meaning}</p>
              </div>
              <button
                onClick={() => onSaveVocab(v.phrase, v.meaning)}
                className="shrink-0 text-xs font-medium text-brand hover:underline"
              >
                Save
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
