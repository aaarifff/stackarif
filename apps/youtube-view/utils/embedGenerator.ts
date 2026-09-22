import { EMBED_COUNTS, type EmbedCount, type EmbedInstance, type EmbedStatus } from '@/types/youtube';

export interface EmbedOptions {
  autoplay?: boolean;
  controls?: boolean;
  startSeconds?: number;
  /**
   * Enables the IFrame postMessage command channel so batch
   * play/pause/mute controls can drive the players.
   */
  enableJsApi?: boolean;
  origin?: string;
}

/**
 * Builds a YouTube embed URL.
 * `mute=1` is always applied — audio is permanently off (spec §2.1.2 / §5.1).
 */
export function buildEmbedUrl(videoId: string, options: EmbedOptions = {}): string {
  const {
    autoplay = false,
    controls = true,
    startSeconds,
    enableJsApi = true,
    origin,
  } = options;

  const params = new URLSearchParams();
  if (autoplay) params.set('autoplay', '1');
  params.set('mute', '1');
  params.set('controls', controls ? '1' : '0');
  params.set('modestbranding', '1');
  params.set('rel', '0');
  params.set('fs', '1');
  params.set('playsinline', '1');
  if (enableJsApi) params.set('enablejsapi', '1');
  if (startSeconds && startSeconds > 0) params.set('start', String(startSeconds));
  if (origin) params.set('origin', origin);

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

/** Whitelisted iframe permissions for YouTube players. */
export const EMBED_ALLOW =
  'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';

/** Creates `count` embed records for a video, mirroring the API response shape. */
export function generateEmbeds(
  videoId: string,
  count: number,
  options: EmbedOptions = {},
): EmbedInstance[] {
  const iframeUrl = buildEmbedUrl(videoId, options);
  return Array.from({ length: count }, (_, index) => ({
    id: `embed_${index + 1}`,
    videoId,
    position: index + 1,
    status: 'loading' as EmbedStatus,
    iframeUrl,
  }));
}

/** Rejects anything outside the supported 20/30/50/100 set. */
export function isAllowedEmbedCount(count: unknown): count is EmbedCount {
  return (
    typeof count === 'number' && (EMBED_COUNTS as readonly number[]).includes(count)
  );
}
