'use client';

import { LAYOUT_MODES, type LayoutMode } from '@/types/youtube';

interface LayoutSelectorProps {
  value: LayoutMode;
  onChange: (mode: LayoutMode) => void;
}

/** View-mode picker: grid sizes, list and compact (spec §2.1.3). */
export function LayoutSelector({ value, onChange }: LayoutSelectorProps) {
  return (
    <section aria-labelledby="layout-heading">
      <h2
        id="layout-heading"
        className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-400"
      >
        View Mode
      </h2>
      <div role="group" aria-labelledby="layout-heading" className="flex flex-wrap gap-2">
        {LAYOUT_MODES.map((mode) => {
          const selected = value === mode.value;
          return (
            <button
              key={mode.value}
              type="button"
              onClick={() => onChange(mode.value)}
              aria-pressed={selected}
              className={`rounded-md border px-3 py-1.5 text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-red-500 ${
                selected
                  ? 'border-red-500 bg-red-500/10 text-white'
                  : 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200'
              }`}
            >
              {mode.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
