'use client';

import {
  EMBED_COUNTS,
  REPEAT_TIMES,
  type EmbedCount,
  type RepeatTime,
} from '@/types/youtube';

interface ConfigPanelProps {
  embedCount: EmbedCount;
  onEmbedCountChange: (count: EmbedCount) => void;
  autoplay: boolean;
  onAutoplayChange: (autoplay: boolean) => void;
  repeatTime: RepeatTime;
  onRepeatTimeChange: (repeatTime: RepeatTime) => void;
  canCreate: boolean;
  isCreating: boolean;
  onCreate: () => void;
}

interface PresetOption<T extends number> {
  value: T;
  label: string;
}

interface PresetGroupProps<T extends number> {
  /** Distinct radio group name so the pickers stay independent. */
  name: string;
  legend: string;
  options: readonly PresetOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

function PresetGroup<T extends number>({
  name,
  legend,
  options,
  value,
  onChange,
}: PresetGroupProps<T>) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-gray-300">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label
            key={option.value}
            className={`cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium transition ${
              value === option.value
                ? 'border-red-500 bg-red-500/10 text-white'
                : 'border-gray-700 text-gray-300 hover:border-gray-500'
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.label}
            <span className="sr-only"> {legend}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** Count, autoplay, repeat-time controls, muted badge and the CTA (§2.1.2). */
export function ConfigPanel({
  embedCount,
  onEmbedCountChange,
  autoplay,
  onAutoplayChange,
  repeatTime,
  onRepeatTimeChange,
  canCreate,
  isCreating,
  onCreate,
}: ConfigPanelProps) {
  return (
    <section aria-labelledby="config-heading" className="space-y-5">
      <h2 id="config-heading" className="text-sm font-semibold uppercase tracking-wide text-gray-400">
        Configuration
      </h2>

      <PresetGroup<EmbedCount>
        name="embed-count"
        legend="Number of Embeds"
        options={EMBED_COUNTS.map((count) => ({ value: count, label: String(count) }))}
        value={embedCount}
        onChange={onEmbedCountChange}
      />

      <PresetGroup<RepeatTime>
        name="autoplay-repeat"
        legend="Autoplay Repeat Time"
        options={REPEAT_TIMES.map((time) => ({
          value: time,
          label: time === 1 ? 'Once' : `${time}×`,
        }))}
        value={repeatTime}
        onChange={onRepeatTimeChange}
      />
      <p className="-mt-3 text-xs text-gray-500">
        {repeatTime === 1
          ? 'Each player plays the video once and stops.'
          : `Each player repeats the video ${repeatTime} times, then pauses itself.`}
        {!autoplay && ' Starts once a player is played.'}
      </p>

      <div className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-900 px-4 py-3">
        <div>
          <p id="autoplay-label" className="text-sm font-medium text-gray-200">
            Enable Autoplay
          </p>
          <p className="text-xs text-gray-500">Starts all players immediately after loading.</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={autoplay}
          aria-labelledby="autoplay-label"
          onClick={() => onAutoplayChange(!autoplay)}
          className={`relative h-7 w-12 shrink-0 rounded-full transition ${
            autoplay ? 'bg-emerald-500' : 'bg-gray-700'
          }`}
        >
          <span
            aria-hidden="true"
            className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${
              autoplay ? 'left-6' : 'left-1'
            }`}
          />
          <span className="sr-only">{autoplay ? 'Autoplay on' : 'Autoplay off'}</span>
        </button>
      </div>

      <div
        className="flex items-center gap-2 rounded-lg border border-gray-800 bg-gray-900 px-4 py-3 text-sm text-gray-300"
        aria-label="Sound is always off"
      >
        <span aria-hidden="true">🔇</span>
        <span className="font-medium">Sound: Always OFF</span>
        <span className="rounded-full bg-gray-800 px-2 py-0.5 text-xs text-gray-400">muted</span>
      </div>

      <button
        type="button"
        onClick={onCreate}
        disabled={!canCreate || isCreating}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-gray-950 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isCreating && (
          <span
            aria-hidden="true"
            className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
          />
        )}
        {isCreating ? 'Creating embeds…' : 'Start Multi-View'}
      </button>
    </section>
  );
}
