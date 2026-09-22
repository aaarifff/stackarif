'use client';

import { useLocalStorage } from './useLocalStorage';
import {
  DEFAULT_EMBED_COUNT,
  DEFAULT_LAYOUT_MODE,
  DEFAULT_REPEAT_TIME,
  type EmbedCount,
  type LayoutMode,
  type RepeatTime,
  type UserPreferences,
} from '@/types/youtube';

const PREFERENCES_KEY = 'multiview:preferences';

const DEFAULT_PREFERENCES: UserPreferences = {
  lastUrl: '',
  layoutMode: DEFAULT_LAYOUT_MODE,
  embedCount: DEFAULT_EMBED_COUNT,
  autoplay: false,
  autoplayRepeat: DEFAULT_REPEAT_TIME,
};

/** Loads and saves the user's last-used configuration (spec §2.3.2). */
export function useUserPreferences() {
  const [preferences, setPreferences, clearPreferences] = useLocalStorage<
    UserPreferences
  >(PREFERENCES_KEY, DEFAULT_PREFERENCES);

  const save = (patch: Partial<UserPreferences>) =>
    setPreferences((current) => ({ ...current, ...patch }));

  return {
    preferences,
    saveUrl: (lastUrl: string) => save({ lastUrl }),
    saveLayoutMode: (layoutMode: LayoutMode) => save({ layoutMode }),
    saveEmbedCount: (embedCount: EmbedCount) => save({ embedCount }),
    saveAutoplay: (autoplay: boolean) => save({ autoplay }),
    saveAutoplayRepeat: (autoplayRepeat: RepeatTime) => save({ autoplayRepeat }),
    clearPreferences,
  };
}
