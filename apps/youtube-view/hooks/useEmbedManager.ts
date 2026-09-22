'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { generateEmbeds } from '@/utils/embedGenerator';
import { commandAll, commandIframe, type PlayerCommand } from '@/utils/iframeControls';
import type {
  EmbedInstance,
  EmbedStatus,
  LayoutMode,
  RepeatTime,
  SessionConfiguration,
} from '@/types/youtube';

const SESSION_STORAGE_KEY = 'multiview:active-session';

export interface CreateSessionInput {
  youtubeUrl: string;
  videoId: string;
  embedCount: number;
  autoplay: boolean;
  autoplayRepeat: RepeatTime;
  layoutMode: LayoutMode;
}

function pageOrigin(): string | undefined {
  return typeof window === 'undefined' ? undefined : window.location.origin;
}

/**
 * Owns embed state: creation (via the API, with a local fallback), individual
 * and batch removal, transport controls, and session-storage persistence.
 */
export function useEmbedManager() {
  const [session, setSession] = useState<SessionConfiguration | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const registry = useRef<Map<string, HTMLIFrameElement>>(new Map());

  // Hydrate the previous session for this tab (spec §2.3.1).
  useEffect(() => {
    try {
      const stored = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (stored) setSession(JSON.parse(stored) as SessionConfiguration);
    } catch {
      // ignore malformed session data
    }
  }, []);

  useEffect(() => {
    try {
      if (session) {
        window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
      } else {
        window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [session]);

  const registerEmbed = useCallback(
    (id: string, element: HTMLIFrameElement | null) => {
      if (element) registry.current.set(id, element);
      else registry.current.delete(id);
    },
    [],
  );

  const markStatus = useCallback((id: string, status: EmbedStatus) => {
    setSession((current) => {
      if (!current) return current;
      const embeds = current.embeds.map((embed) =>
        embed.id === id ? { ...embed, status } : embed,
      );
      return { ...current, embeds };
    });
  }, []);

  const createSession = useCallback(
    async (input: CreateSessionInput, startSeconds?: number) => {
      setIsCreating(true);
      setError(null);
      registry.current.clear();

      const origin = pageOrigin();
      const fallbackEmbeds = generateEmbeds(input.videoId, input.embedCount, {
        autoplay: input.autoplay,
        startSeconds,
        origin,
      });

      let sessionId = `sess_local_${Date.now().toString(36)}`;
      let embeds = fallbackEmbeds;

      try {
        const response = await fetch('/api/generate-embeds', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            videoId: input.videoId,
            count: input.embedCount,
            autoplay: input.autoplay,
            repeat: input.autoplayRepeat,
            layout: input.layoutMode,
            startSeconds,
            origin,
          }),
        });
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        const data = (await response.json()) as {
          sessionId: string;
          embeds: EmbedInstance[];
        };
        sessionId = data.sessionId ?? sessionId;
        if (Array.isArray(data.embeds) && data.embeds.length > 0) {
          embeds = data.embeds;
        }
      } catch {
        // The API is optional for rendering — fall back to local generation.
        setError(null);
      }

      const nextSession: SessionConfiguration = {
        sessionId,
        youtubeUrl: input.youtubeUrl,
        videoId: input.videoId,
        embedCount: input.embedCount,
        autoplay: input.autoplay,
        autoplayRepeat: input.autoplayRepeat,
        sound: 'always_off',
        layoutMode: input.layoutMode,
        createdAt: new Date().toISOString(),
        embeds,
      };

      setSession(nextSession);
      setIsCreating(false);

      // Best-effort persistence; the UI does not depend on it.
      void fetch('/api/save-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, configuration: nextSession }),
      }).catch(() => undefined);

      return nextSession;
    },
    [],
  );

  const removeEmbed = useCallback((id: string) => {
    registry.current.delete(id);
    setSession((current) => {
      if (!current) return current;
      const embeds = current.embeds
        .filter((embed) => embed.id !== id)
        .map((embed, index) => ({ ...embed, position: index + 1 }));
      return { ...current, embeds, embedCount: embeds.length };
    });
  }, []);

  const removeAll = useCallback(() => {
    registry.current.clear();
    setSession(null);
  }, []);

  const updateLayout = useCallback((layoutMode: LayoutMode) => {
    setSession((current) => (current ? { ...current, layoutMode } : current));
  }, []);

  const sendCommand = useCallback((func: PlayerCommand) => {
    commandAll(registry.current, func);
  }, []);

  const sendCommandTo = useCallback((id: string, func: PlayerCommand) => {
    commandIframe(registry.current.get(id), func);
  }, []);

  const embedCount = session?.embeds.length ?? 0;
  const loadedCount =
    session?.embeds.filter((embed) => embed.status === 'loaded').length ?? 0;

  return {
    session,
    isCreating,
    error,
    embedCount,
    loadedCount,
    registerEmbed,
    markStatus,
    createSession,
    removeEmbed,
    removeAll,
    updateLayout,
    // Audio is always muted: re-assert mute whenever playback is driven.
    playAll: () => {
      sendCommand('mute');
      sendCommand('playVideo');
    },
    pauseAll: () => sendCommand('pauseVideo'),
    playOne: (id: string) => {
      sendCommandTo(id, 'mute');
      sendCommandTo(id, 'playVideo');
    },
    pauseOne: (id: string) => sendCommandTo(id, 'pauseVideo'),
  };
}
