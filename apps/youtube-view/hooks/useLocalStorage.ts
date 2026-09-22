'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Persists a value in localStorage and hydrates it on mount.
 * SSR-safe: the first render always uses `initialValue`.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const hydrated = useRef(false);

  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) setValue(JSON.parse(stored) as T);
    } catch {
      // Corrupt or unavailable storage — fall back to the default.
    }
  }, [key]);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Quota exceeded or private mode — ignore.
    }
  }, [key, value]);

  const remove = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // ignore
    }
    setValue(initialValue);
  }, [key, initialValue]);

  return [value, setValue, remove] as const;
}
