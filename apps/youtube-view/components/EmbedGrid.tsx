'use client';

import { EmbedItem } from './EmbedItem';
import {
  LAYOUT_MODES,
  type EmbedInstance,
  type EmbedStatus,
  type LayoutMode,
  type RepeatTime,
} from '@/types/youtube';

interface EmbedGridProps {
  embeds: EmbedInstance[];
  layoutMode: LayoutMode;
  repeatTimes: RepeatTime;
  onRemove: (id: string) => void;
  onRegister: (id: string, element: HTMLIFrameElement | null) => void;
  onStatusChange: (id: string, status: EmbedStatus) => void;
  onPlay: (id: string) => void;
  onPause: (id: string) => void;
}

/**
 * Renders embeds in the selected layout. Column counts come from a static
 * map (Tailwind cannot compile dynamic class names), so responsive
 * overrides live in globals.css.
 */
export function EmbedGrid({
  embeds,
  layoutMode,
  repeatTimes,
  onRemove,
  onRegister,
  onStatusChange,
  onPlay,
  onPause,
}: EmbedGridProps) {
  const columns = LAYOUT_MODES.find((mode) => mode.value === layoutMode)?.columns ?? 4;
  const isList = layoutMode === 'list';
  const isCompact = layoutMode === 'compact';

  const layoutClass = isList ? 'embed-list' : isCompact ? 'embed-compact' : 'embed-grid';

  return (
    <div
      className={layoutClass}
      style={isList ? undefined : { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      role="group"
      aria-label={`YouTube embeds, ${layoutMode.replace('_', ' ')} layout`}
    >
      {embeds.map((embed) => (
        <EmbedItem
          // Remount when the source video changes so playback counters reset.
          key={`${embed.videoId}-${embed.id}`}
          embed={embed}
          total={embeds.length}
          repeatTimes={repeatTimes}
          compact={isCompact}
          onRemove={onRemove}
          onRegister={onRegister}
          onStatusChange={onStatusChange}
          onPlay={onPlay}
          onPause={onPause}
        />
      ))}
    </div>
  );
}
