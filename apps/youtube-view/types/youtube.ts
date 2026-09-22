/** Layout options supported by the dashboard. */
export type LayoutMode =
  | 'grid_2x2'
  | 'grid_3x3'
  | 'grid_4x4'
  | 'grid_5x5'
  | 'list'
  | 'compact';

export const LAYOUT_MODES: { value: LayoutMode; label: string; columns: number }[] = [
  { value: 'grid_2x2', label: 'Grid 2x2', columns: 2 },
  { value: 'grid_3x3', label: 'Grid 3x3', columns: 3 },
  { value: 'grid_4x4', label: 'Grid 4x4', columns: 4 },
  { value: 'grid_5x5', label: 'Grid 5x5', columns: 5 },
  { value: 'list', label: 'List', columns: 1 },
  { value: 'compact', label: 'Compact', columns: 5 },
];

export const DEFAULT_LAYOUT_MODE: LayoutMode = 'grid_4x4';

/** Embed quantities offered in the UI (spec §2.1.2). */
export const EMBED_COUNTS = [20, 30, 50, 100] as const;
export type EmbedCount = (typeof EMBED_COUNTS)[number];
export const DEFAULT_EMBED_COUNT: EmbedCount = 20;
export const MAX_EMBEDS = 100;

/**
 * How many times each player plays the video before it pauses itself
 * (spec §2.1.2 "Autoplay Repeat Time"). 1 = play once and stop.
 */
export const REPEAT_TIMES = [1, 3, 5, 10, 20] as const;
export type RepeatTime = (typeof REPEAT_TIMES)[number];
export const DEFAULT_REPEAT_TIME: RepeatTime = 1;

export type EmbedStatus = 'loading' | 'loaded' | 'error';

export interface EmbedInstance {
  /** Stable id, e.g. "embed_1". */
  id: string;
  videoId: string;
  /** 1-based position in the session. */
  position: number;
  status: EmbedStatus;
  /** Fully built iframe src. */
  iframeUrl: string;
}

export interface SessionConfiguration {
  sessionId: string;
  youtubeUrl: string;
  videoId: string;
  embedCount: number;
  autoplay: boolean;
  /** Playthroughs per player before it pauses itself. */
  autoplayRepeat: RepeatTime;
  /** Audio is always off (spec §2.1.2). */
  sound: 'always_off';
  layoutMode: LayoutMode;
  createdAt: string;
  embeds: EmbedInstance[];
}

export interface UserPreferences {
  lastUrl: string;
  layoutMode: LayoutMode;
  embedCount: EmbedCount;
  autoplay: boolean;
  autoplayRepeat: RepeatTime;
}

export type ValidationStatus = 'empty' | 'checking' | 'valid' | 'invalid';

export interface ValidationResult {
  status: ValidationStatus;
  videoId: string | null;
  title?: string | null;
  message?: string;
}

export interface YoutubeParseResult {
  valid: boolean;
  videoId: string | null;
  /** Present when the URL carried a ?t= / #t= timestamp, in seconds. */
  startSeconds?: number;
  error?: string;
}
