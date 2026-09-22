import { NextResponse } from 'next/server';
import { generateEmbeds } from '@/utils/embedGenerator';
import { createSessionId, saveSession } from '@/lib/sessionStore';
import {
  clientKeyFromRequest,
  isValidLayoutMode,
  normalizeEmbedCount,
  normalizeRepeatTime,
  rateLimit,
  sanitizeOrigin,
  sanitizeVideoId,
} from '@/utils/validators';
import {
  DEFAULT_LAYOUT_MODE,
  DEFAULT_REPEAT_TIME,
  LAYOUT_MODES,
  type LayoutMode,
} from '@/types/youtube';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface GenerateBody {
  videoId?: unknown;
  count?: unknown;
  autoplay?: unknown;
  /** Playthroughs per player before it pauses itself. */
  repeat?: unknown;
  layout?: unknown;
  startSeconds?: unknown;
  origin?: unknown;
}

/** POST /api/generate-embeds — builds N embed records for a video. */
export async function POST(request: Request) {
  if (!rateLimit(`generate:${clientKeyFromRequest(request)}`, 30)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  let body: GenerateBody;
  try {
    body = (await request.json()) as GenerateBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const videoId = sanitizeVideoId(body.videoId);
  if (!videoId) {
    return NextResponse.json(
      { error: 'A valid 11-character videoId is required' },
      { status: 400 },
    );
  }

  const count = normalizeEmbedCount(body.count);
  if (count === null) {
    return NextResponse.json(
      { error: 'Maximum 100 embeds. Please select 20, 30, 50 or 100.' },
      { status: 400 },
    );
  }

  const autoplay = body.autoplay === true;
  const autoplayRepeat = normalizeRepeatTime(body.repeat) ?? DEFAULT_REPEAT_TIME;
  const layoutMode: LayoutMode = isValidLayoutMode(body.layout)
    ? body.layout
    : DEFAULT_LAYOUT_MODE;
  const origin = sanitizeOrigin(body.origin);
  const startSeconds =
    typeof body.startSeconds === 'number' && body.startSeconds > 0
      ? Math.floor(body.startSeconds)
      : undefined;

  const embeds = generateEmbeds(videoId, count, { autoplay, startSeconds, origin });
  const sessionId = createSessionId();

  saveSession({
    sessionId,
    youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
    videoId,
    embedCount: count,
    autoplay,
    autoplayRepeat,
    sound: 'always_off',
    layoutMode,
    createdAt: new Date().toISOString(),
    embeds,
  });

  return NextResponse.json({
    sessionId,
    embeds,
    autoplayRepeat,
    layout: LAYOUT_MODES.find((mode) => mode.value === layoutMode)?.value ?? layoutMode,
  });
}
