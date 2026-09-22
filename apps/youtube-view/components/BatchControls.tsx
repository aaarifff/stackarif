'use client';

interface BatchControlsProps {
  embedCount: number;
  loadedCount: number;
  onPlayAll: () => void;
  onPauseAll: () => void;
  onRemoveAll: () => void;
}

/** Batch transport + destructive actions (spec §2.2.3). */
export function BatchControls({
  embedCount,
  loadedCount,
  onPlayAll,
  onPauseAll,
  onRemoveAll,
}: BatchControlsProps) {
  if (embedCount === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-gray-800 pb-4">
      <span className="mr-auto text-sm text-gray-400" aria-live="polite">
        {loadedCount}/{embedCount} players loaded
      </span>

      <button
        type="button"
        onClick={onPlayAll}
        className="rounded-md border border-gray-700 px-3 py-1.5 text-xs font-medium text-gray-200 transition hover:border-gray-500 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        ▶ Play All
      </button>
      <button
        type="button"
        onClick={onPauseAll}
        className="rounded-md border border-gray-700 px-3 py-1.5 text-xs font-medium text-gray-200 transition hover:border-gray-500 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        ⏸ Pause All
      </button>
      <span
        className="rounded-md border border-gray-800 bg-gray-900 px-3 py-1.5 text-xs text-gray-500"
        title="Players are permanently muted"
      >
        🔇 Mute All (always on)
      </span>
      <button
        type="button"
        onClick={onRemoveAll}
        className="rounded-md border border-red-900 px-3 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-950 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Remove All
      </button>
    </div>
  );
}
