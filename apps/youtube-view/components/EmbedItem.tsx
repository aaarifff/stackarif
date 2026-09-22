'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { LoadingSkeleton } from './LoadingSkeleton';
import { useInView } from '@/hooks/useInView';
import { EMBED_ALLOW } from '@/utils/embedGenerator';
import { commandIframe, replayIframe } from '@/utils/iframeControls';
import { nextPlaybackAction, watchPlayer } from '@/utils/playerController';
import type { EmbedInstance, EmbedStatus, RepeatTime } from '@/types/youtube';

interface EmbedItemProps {
  embed: EmbedInstance;
  total: number;
  /** Playthroughs before this player pauses itself (1 = play once). */
  repeatTimes: RepeatTime;
  compact?: boolean;
  onRemove: (id: string) => void;
  onRegister: (id: string, element: HTMLIFrameElement | null) => void;
  onStatusChange: (id: string, status: EmbedStatus) => void;
  onPlay: (id: string) => void;
  onPause: (id: string) => void;
}

/**
 * A single muted, lazy-loaded YouTube player. Tracks its own playthroughs and
 * replays until the configured repeat time, then pauses for good (§2.1.2).
 */
export function EmbedItem({
  embed,
  total,
  repeatTimes,
  compact = false,
  onRemove,
  onRegister,
  onStatusChange,
  onPlay,
  onPause,
}: EmbedItemProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const unwatchRef = useRef<(() => void) | null>(null);
  const playsRef = useRef(0);
  const repeatRef = useRef(repeatTimes);
  const [plays, setPlays] = useState(0);

  repeatRef.current = repeatTimes;

  useEffect(
    () => () => {
      unwatchRef.current?.();
      unwatchRef.current = null;
    },
    [],
  );

  const setRef = useCallback(
    (element: HTMLIFrameElement | null) => {
      iframeRef.current = element;
      onRegister(embed.id, element);
    },
    [embed.id, onRegister],
  );

  const handleLoad = useCallback(() => {
    onStatusChange(embed.id, 'loaded');

    const element = iframeRef.current;
    if (!element) return;

    // A fresh load means a fresh playback timeline.
    playsRef.current = 0;
    setPlays(0);

    unwatchRef.current?.();
    unwatchRef.current = watchPlayer(element, (state) => {
      const progress = nextPlaybackAction(
        state,
        playsRef.current,
        repeatRef.current,
      );
      if (progress.action === 'ignore') return;

      playsRef.current = progress.completedPlays;
      setPlays(progress.completedPlays);

      if (progress.action === 'replay') {
        replayIframe(element);
      } else {
        // Repeat time reached — stop instead of playing again.
        commandIframe(element, 'pauseVideo');
      }
    });
  }, [embed.id, onStatusChange]);

  return (
    <div
      ref={ref}
      className={`group relative animate-fade-in overflow-hidden rounded-lg border border-gray-800 bg-black ${
        compact ? 'text-[10px]' : ''
      }`}
    >
      <div className="relative aspect-video w-full">
        {inView ? (
          <iframe
            ref={setRef}
            src={embed.iframeUrl}
            title={`YouTube multiview player ${embed.position}`}
            allow={EMBED_ALLOW}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={handleLoad}
            onError={() => onStatusChange(embed.id, 'error')}
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <LoadingSkeleton
            className="absolute inset-0 h-full w-full"
            label={`Loading player ${embed.position}`}
          />
        )}
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-1.5">
        <span className="rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-medium text-white">
          {embed.position}/{total}
        </span>
        <span className="flex gap-1">
          {repeatTimes > 1 && (
            <span
              className="rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-medium text-amber-300"
              title={`Repeats ${repeatTimes} times, then pauses`}
            >
              ↻ {plays}/{repeatTimes}
            </span>
          )}
          <span className="rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-medium text-white">
            🔇
          </span>
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-gradient-to-t from-black/80 to-transparent p-1.5 opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100">
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => onPlay(embed.id)}
            aria-label={`Play player ${embed.position}`}
            className="rounded bg-black/70 px-2 py-1 text-[11px] text-white hover:bg-black"
          >
            ▶
          </button>
          <button
            type="button"
            onClick={() => onPause(embed.id)}
            aria-label={`Pause player ${embed.position}`}
            className="rounded bg-black/70 px-2 py-1 text-[11px] text-white hover:bg-black"
          >
            ⏸
          </button>
        </div>
        <div className="flex items-center gap-1">
          {embed.status === 'error' && (
            <span className="rounded bg-red-600/90 px-1.5 py-0.5 text-[11px] text-white">
              Failed
            </span>
          )}
          <button
            type="button"
            onClick={() => onRemove(embed.id)}
            aria-label={`Remove player ${embed.position}`}
            className="rounded bg-black/70 px-2 py-1 text-[11px] text-white hover:bg-red-600"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
