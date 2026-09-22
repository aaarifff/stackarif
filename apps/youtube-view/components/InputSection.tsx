'use client';

import type { ValidationResult } from '@/types/youtube';

interface InputSectionProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  validation: ValidationResult;
}

/** URL field with inline validation feedback (spec §2.1.1 / §2.4.2). */
export function InputSection({ value, onChange, onClear, validation }: InputSectionProps) {
  const { status, videoId, title, message } = validation;

  return (
    <section aria-labelledby="url-heading" className="w-full">
      <label
        id="url-heading"
        htmlFor="youtube-url"
        className="mb-1 block text-sm font-medium text-gray-300"
      >
        YouTube Video
      </label>

      <div className="relative">
        <input
          id="youtube-url"
          type="text"
          inputMode="url"
          autoComplete="off"
          spellCheck={false}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Paste YouTube URL or Video ID"
          aria-invalid={status === 'invalid'}
          aria-describedby="youtube-url-status"
          className={`w-full rounded-lg border bg-gray-900 py-3 pl-4 pr-24 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 ${
            status === 'invalid'
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-700 focus:ring-red-500'
          }`}
        />

        <div className="absolute inset-y-0 right-3 flex items-center gap-2">
          {status === 'checking' && (
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-gray-600 border-t-white"
            />
          )}
          {status === 'valid' && (
            <span aria-hidden="true" className="text-lg text-emerald-500">
              ✓
            </span>
          )}
          {value && (
            <button
              type="button"
              onClick={onClear}
              aria-label="Clear YouTube URL"
              className="rounded-full p-1 text-gray-400 transition hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <p
        id="youtube-url-status"
        aria-live="polite"
        className={`mt-2 min-h-5 text-xs ${
          status === 'invalid'
            ? 'text-red-400'
            : status === 'valid'
              ? 'text-emerald-400'
              : 'text-gray-500'
        }`}
      >
        {status === 'empty' && 'Supports youtube.com/watch, youtu.be and raw video IDs.'}
        {status === 'checking' && 'Checking video…'}
        {status === 'invalid' && `❌ ${message ?? 'Invalid YouTube URL'}`}
        {status === 'valid' &&
          `✅ Verified • ID: ${videoId}${title ? ` • ${title}` : ''}`}
      </p>
    </section>
  );
}
