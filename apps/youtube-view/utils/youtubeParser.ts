import type { YoutubeParseResult } from '@/types/youtube';

/** A YouTube video id is exactly 11 URL-safe base64 chars. */
export const VIDEO_ID_PATTERN = /^[a-zA-Z0-9_-]{11}$/;

const URL_PATTERNS: RegExp[] = [
  /(?:youtube\.com\/watch\?(?:.*&)?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/|youtube\.com\/live\/)([a-zA-Z0-9_-]{11})/,
];

const TIME_PATTERNS: RegExp[] = [/[?&#]t=(\d+)s?/, /[?&#]start=(\d+)/];

/**
 * Extracts a YouTube video id from any supported input shape:
 *   1. https://www.youtube.com/watch?v=VIDEO_ID
 *   2. https://youtu.be/VIDEO_ID
 *   3. watch/shorts/live/embed URLs, with or without timestamps
 *   4. A bare 11-character VIDEO_ID
 */
export function parseYoutubeUrl(input: string): YoutubeParseResult {
  const raw = (input ?? '').trim();

  if (!raw) {
    return { valid: false, videoId: null, error: 'Please enter a YouTube URL' };
  }

  // Bare video id.
  if (VIDEO_ID_PATTERN.test(raw)) {
    return { valid: true, videoId: raw };
  }

  // Reject anything that is not an http(s) or protocol-less youtube host.
  let candidate = raw;
  if (!/^https?:\/\//i.test(candidate)) {
    if (!/^(www\.)?(youtube\.com|youtu\.be|m\.youtube\.com)/i.test(candidate)) {
      return { valid: false, videoId: null, error: 'Invalid YouTube URL' };
    }
    candidate = `https://${candidate}`;
  }

  let url: URL;
  try {
    url = new URL(candidate);
  } catch {
    return { valid: false, videoId: null, error: 'Invalid YouTube URL' };
  }

  const host = url.hostname.replace(/^www\.|^m\./i, '').toLowerCase();
  if (host !== 'youtube.com' && host !== 'youtu.be' && host !== 'music.youtube.com') {
    return { valid: false, videoId: null, error: 'Only YouTube links are supported' };
  }

  const normalized = `${url.hostname}${url.pathname}${url.search}${url.hash}`;
  let videoId: string | null = null;
  for (const pattern of URL_PATTERNS) {
    const match = normalized.match(pattern);
    if (match?.[1] && VIDEO_ID_PATTERN.test(match[1])) {
      videoId = match[1];
      break;
    }
  }

  // Fallback: ?v= on any path (covers /watch with extra params).
  if (!videoId) {
    const v = url.searchParams.get('v');
    if (v && VIDEO_ID_PATTERN.test(v)) videoId = v;
  }

  if (!videoId) {
    return { valid: false, videoId: null, error: 'Invalid YouTube URL' };
  }

  const startSeconds = extractStartSeconds(raw);
  return startSeconds === undefined
    ? { valid: true, videoId }
    : { valid: true, videoId, startSeconds };
}

function extractStartSeconds(input: string): number | undefined {
  for (const pattern of TIME_PATTERNS) {
    const match = input.match(pattern);
    if (match?.[1]) {
      const seconds = Number.parseInt(match[1], 10);
      if (Number.isFinite(seconds) && seconds >= 0) return seconds;
    }
  }
  return undefined;
}

/** True when the input already parses to a usable video id. */
export function isValidYoutubeInput(input: string): boolean {
  return parseYoutubeUrl(input).valid;
}
