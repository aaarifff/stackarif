import { NextResponse } from 'next/server';
import { saveSession } from '@/lib/sessionStore';
import { clientKeyFromRequest, rateLimit, sanitizeVideoId } from '@/utils/validators';
import {
  DEFAULT_LAYOUT_MODE,
  DEFAULT_REPEAT_TIME,
  type SessionConfiguration,
} from '@/types/youtube';
import {
  isValidLayoutMode,
  normalizeEmbedCount,
  normalizeRepeatTime,
} from '@/utils/validators';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface SaveBody {
  sessionId?: unknown;
  configuration?: Partial<SessionConfiguration>;
}

/** POST /api/save-session — persists a session configuration. */
export async function POST(request: Request) {
  if (!rateLimit(`save:${clientKeyFromRequest(request)}`, 60)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  let body: SaveBody;
  try {
    body = (await request.json()) as SaveBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const sessionId =
    typeof body.sessionId === 'string' && body.sessionId.length <= 64
      ? body.sessionId
      : null;
  if (!sessionId) {
    return NextResponse.json({ error: 'sessionId is required' }, { status: 400 });
  }

  const config = body.configuration ?? {};
  const videoId = sanitizeVideoId(config.videoId);
  if (!videoId) {
    return NextResponse.json({ error: 'Invalid configuration' }, { status: 400 });
  }

  const embedCount = normalizeEmbedCount(config.embedCount) ?? 0;
  const layoutMode = isValidLayoutMode(config.layoutMode)
    ? config.layoutMode
    : DEFAULT_LAYOUT_MODE;

  saveSession({
    sessionId,
    youtubeUrl:
      typeof config.youtubeUrl === 'string' ? config.youtubeUrl.slice(0, 512) : '',
    videoId,
    embedCount,
    autoplay: config.autoplay === true,
    autoplayRepeat: normalizeRepeatTime(config.autoplayRepeat) ?? DEFAULT_REPEAT_TIME,
    sound: 'always_off',
    layoutMode,
    createdAt:
      typeof config.createdAt === 'string' ? config.createdAt : new Date().toISOString(),
    embeds: Array.isArray(config.embeds) ? config.embeds.slice(0, 100) : [],
  });

  return NextResponse.json({ saved: true, sessionId });
}
