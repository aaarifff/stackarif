import { VIDEO_ID_PATTERN } from './youtubeParser';
import {
  EMBED_COUNTS,
  LAYOUT_MODES,
  REPEAT_TIMES,
  type LayoutMode,
  type RepeatTime,
} from '@/types/youtube';

/** Video ids are turned into embed URLs and must never carry markup. */
export function sanitizeVideoId(input: unknown): string | null {
  if (typeof input !== 'string') return null;
  const trimmed = input.trim();
  return VIDEO_ID_PATTERN.test(trimmed) ? trimmed : null;
}

export function isValidLayoutMode(value: unknown): value is LayoutMode {
  return (
    typeof value === 'string' && LAYOUT_MODES.some((mode) => mode.value === value)
  );
}

export function normalizeEmbedCount(value: unknown): number | null {
  const count = typeof value === 'number' ? value : Number(value);
  return (EMBED_COUNTS as readonly number[]).includes(count) ? count : null;
}

/** Accepts only the offered autoplay repeat times (1/3/5/10/20). */
export function normalizeRepeatTime(value: unknown): RepeatTime | null {
  const times = typeof value === 'number' ? value : Number(value);
  return (REPEAT_TIMES as readonly number[]).includes(times)
    ? (times as RepeatTime)
    : null;
}

/**
 * Strips control characters and angle brackets from free-text input
 * before it is echoed into a response or persisted.
 */
export function sanitizeText(input: unknown, maxLength = 2048): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, maxLength);
}

/**
 * Accepts only a bare http(s) origin (no path/query), used for the iframe
 * `origin` param that scopes the player postMessage channel.
 */
export function sanitizeOrigin(value: unknown): string | undefined {
  if (typeof value !== 'string' || value.length > 200) return undefined;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return undefined;
    return url.origin;
  } catch {
    return undefined;
  }
}

/** Minimal in-memory rate limiter for the API routes (spec §9.1). */
const buckets = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit = 30, windowMs = 60_000): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (bucket.count >= limit) return false;
  bucket.count += 1;
  return true;
}

export function clientKeyFromRequest(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'anonymous'
  );
}
