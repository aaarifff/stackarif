import type { SessionConfiguration } from '@/types/youtube';

/**
 * In-memory session store. Swap these two helpers for MongoDB/Supabase
 * (spec §3.2) without touching any calling code.
 */
const globalStore = globalThis as unknown as {
  __multiviewSessions?: Map<string, SessionConfiguration>;
};

const sessions: Map<string, SessionConfiguration> =
  globalStore.__multiviewSessions ?? new Map();
globalStore.__multiviewSessions = sessions;

export function createSessionId(): string {
  return `sess_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

export function saveSession(session: SessionConfiguration): SessionConfiguration {
  sessions.set(session.sessionId, session);
  // Bound memory: keep the 100 most recent sessions.
  if (sessions.size > 100) {
    const oldest = sessions.keys().next().value;
    if (oldest) sessions.delete(oldest);
  }
  return session;
}

export function getSession(sessionId: string): SessionConfiguration | null {
  return sessions.get(sessionId) ?? null;
}

export function listSessions(): SessionConfiguration[] {
  return Array.from(sessions.values()).sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
}

export function deleteSession(sessionId: string): boolean {
  return sessions.delete(sessionId);
}
