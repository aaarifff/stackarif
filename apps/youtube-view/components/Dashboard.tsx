'use client';

import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BatchControls } from './BatchControls';
import { ConfigPanel } from './ConfigPanel';
import { EmbedGrid } from './EmbedGrid';
import { InputSection } from './InputSection';
import { LayoutSelector } from './LayoutSelector';
import { useEmbedManager } from '@/hooks/useEmbedManager';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { useYoutubeValidator } from '@/hooks/useYoutubeValidator';
import { parseYoutubeUrl } from '@/utils/youtubeParser';
import {
  DEFAULT_EMBED_COUNT,
  DEFAULT_LAYOUT_MODE,
  DEFAULT_REPEAT_TIME,
  type EmbedCount,
  type EmbedStatus,
  type LayoutMode,
  type RepeatTime,
} from '@/types/youtube';

/** Main dashboard: input, configuration and the embed canvas. */
export function Dashboard() {
  const {
    preferences,
    saveUrl,
    saveLayoutMode,
    saveEmbedCount,
    saveAutoplay,
    saveAutoplayRepeat,
    clearPreferences,
  } = useUserPreferences();

  const [input, setInput] = useState('');
  const [embedCount, setEmbedCount] = useState<EmbedCount>(DEFAULT_EMBED_COUNT);
  const [autoplay, setAutoplay] = useState(false);
  const [repeatTime, setRepeatTime] = useState<RepeatTime>(DEFAULT_REPEAT_TIME);
  const [layoutMode, setLayoutMode] = useState<LayoutMode>(DEFAULT_LAYOUT_MODE);
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);

  const validation = useYoutubeValidator(input);
  const manager = useEmbedManager();

  // Hydrate from preferences once (localStorage read happens client-side).
  useEffect(() => {
    if (preferencesLoaded) return;
    setPreferencesLoaded(true);
    setInput(preferences.lastUrl);
    setEmbedCount(preferences.embedCount);
    setAutoplay(preferences.autoplay);
    setRepeatTime(preferences.autoplayRepeat);
    setLayoutMode(preferences.layoutMode);
  }, [preferences, preferencesLoaded]);

  const handleLayoutChange = useCallback(
    (mode: LayoutMode) => {
      setLayoutMode(mode);
      saveLayoutMode(mode);
      manager.updateLayout(mode);
    },
    [manager, saveLayoutMode],
  );

  const handleCreate = useCallback(async () => {
    if (!validation.videoId) {
      toast.error('❌ Please enter a valid YouTube URL');
      return;
    }
    const parsed = parseYoutubeUrl(input);
    toast.loading('ℹ️ Embeds are loading…', { id: 'create-embeds' });
    const session = await manager.createSession(
      {
        youtubeUrl: input.trim(),
        videoId: validation.videoId,
        embedCount,
        autoplay,
        autoplayRepeat: repeatTime,
        layoutMode,
      },
      parsed.startSeconds,
    );
    const repeats =
      repeatTime > 1 ? `, each repeating ${repeatTime}×` : ', muted';
    toast.success(
      `✅ ${session.embeds.length} embeds created successfully${repeats}!`,
      { id: 'create-embeds' },
    );
  }, [autoplay, embedCount, input, layoutMode, manager, repeatTime, validation.videoId]);

  const handleReset = useCallback(() => {
    if (manager.embedCount > 0 && !window.confirm('Clear all embeds and settings?')) return;
    setInput('');
    setEmbedCount(DEFAULT_EMBED_COUNT);
    setAutoplay(false);
    setRepeatTime(DEFAULT_REPEAT_TIME);
    setLayoutMode(DEFAULT_LAYOUT_MODE);
    manager.removeAll();
    clearPreferences();
    toast.success('Reset complete');
  }, [clearPreferences, manager]);

  const handleCopyConfig = useCallback(async () => {
    const config = {
      youtubeUrl: input.trim(),
      videoId: validation.videoId,
      embedCount,
      autoplay,
      autoplayRepeat: repeatTime,
      sound: 'always_off',
      layoutMode,
      sessionId: manager.session?.sessionId ?? null,
      createdAt: manager.session?.createdAt ?? null,
    };
    try {
      await navigator.clipboard.writeText(JSON.stringify(config, null, 2));
      toast.success('Configuration copied to clipboard');
    } catch {
      toast.error('❌ Could not access the clipboard');
    }
  }, [autoplay, embedCount, input, layoutMode, manager.session, repeatTime, validation.videoId]);

  const handleRemoveAll = useCallback(() => {
    if (!window.confirm('Remove all embeds?')) return;
    manager.removeAll();
    toast.success('All embeds removed');
  }, [manager]);

  const handleStatusChange = useCallback(
    (id: string, status: EmbedStatus) => manager.markStatus(id, status),
    [manager],
  );

  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 py-6">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">YouTube Multi-View</h1>
          <p className="text-sm text-gray-400">
            Embed one video many times, muted, in your choice of layout.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleCopyConfig}
            className="rounded-md border border-gray-700 px-3 py-1.5 text-xs font-medium text-gray-200 transition hover:border-gray-500 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Copy Configuration
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-md border border-gray-700 px-3 py-1.5 text-xs font-medium text-gray-200 transition hover:border-gray-500 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Reset
          </button>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
        <aside className="space-y-6 rounded-xl border border-gray-800 bg-gray-950/60 p-5 lg:sticky lg:top-6 lg:self-start">
          <InputSection
            value={input}
            onChange={setInput}
            onClear={() => setInput('')}
            validation={validation}
          />
          <ConfigPanel
            embedCount={embedCount}
            onEmbedCountChange={(count) => {
              setEmbedCount(count);
              saveEmbedCount(count);
            }}
            autoplay={autoplay}
            onAutoplayChange={(next) => {
              setAutoplay(next);
              saveAutoplay(next);
            }}
            repeatTime={repeatTime}
            onRepeatTimeChange={(next) => {
              setRepeatTime(next);
              saveAutoplayRepeat(next);
            }}
            canCreate={validation.status === 'valid'}
            isCreating={manager.isCreating}
            onCreate={handleCreate}
          />
          <LayoutSelector value={layoutMode} onChange={handleLayoutChange} />
          <p className="text-xs text-gray-500">
            Preferences are stored locally in your browser. Autoplay may be blocked by
            your browser until you interact with the page.
          </p>
        </aside>

        <main className="min-w-0">
          <BatchControls
            embedCount={manager.embedCount}
            loadedCount={manager.loadedCount}
            onPlayAll={() => manager.playAll()}
            onPauseAll={() => manager.pauseAll()}
            onRemoveAll={handleRemoveAll}
          />

          {manager.session ? (
            <div className="pt-4">
              <EmbedGrid
                embeds={manager.session.embeds}
                layoutMode={layoutMode}
                repeatTimes={manager.session.autoplayRepeat}
                onRemove={(id) => {
                  manager.removeEmbed(id);
                  saveUrl(input.trim());
                }}
                onRegister={manager.registerEmbed}
                onStatusChange={handleStatusChange}
                onPlay={manager.playOne}
                onPause={manager.pauseOne}
              />
            </div>
          ) : (
            <div className="flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-800 p-10 text-center">
              <p className="text-lg font-medium text-gray-300">No embeds yet</p>
              <p className="mt-1 max-w-md text-sm text-gray-500">
                Paste a YouTube link, pick how many copies you want, then press Start
                Multi-View. Audio stays muted on every player.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
