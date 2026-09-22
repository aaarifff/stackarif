import { NextResponse } from 'next/server';
import { parseYoutubeUrl } from '@/utils/youtubeParser';
import { clientKeyFromRequest, rateLimit, sanitizeText } from '@/utils/validators';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface ValidateBody {
  url?: unknown;
}

/** POST /api/validate-url — validates a YouTube URL and resolves its title. */
export async function POST(request: Request) {
  if (!rateLimit(`validate:${clientKeyFromRequest(request)}`, 60)) {
    return NextResponse.json(
      { valid: false, videoId: null, error: 'Too many requests' },
      { status: 429 },
    );
  }

  let body: ValidateBody;
  try {
    body = (await request.json()) as ValidateBody;
  } catch {
    return NextResponse.json(
      { valid: false, videoId: null, error: 'Invalid JSON body' },
      { status: 400 },
    );
  }

  const url = sanitizeText(body.url, 512);
  const parsed = parseYoutubeUrl(url);

  if (!parsed.valid || !parsed.videoId) {
    return NextResponse.json({
      valid: false,
      videoId: null,
      error: parsed.error ?? 'Invalid YouTube URL',
    });
  }

  // oEmbed is unauthenticated. If it fails (private video, offline, blocked
  // egress) we still report the URL as structurally valid.
  let title: string | null = null;
  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(
      `https://www.youtube.com/watch?v=${parsed.videoId}`,
    )}&format=json`;
    const response = await fetch(oembedUrl, {
      signal: AbortSignal.timeout(4000),
      cache: 'no-store',
    });
    if (response.ok) {
      const data = (await response.json()) as { title?: string };
      title = sanitizeText(data.title, 200) || null;
    }
  } catch {
    title = null;
  }

  return NextResponse.json({
    valid: true,
    videoId: parsed.videoId,
    title,
  });
}
