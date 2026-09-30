"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { DARK_QUERY, THEME_STORAGE_KEY, type ResolvedTheme, type Theme } from "@/lib/theme";

/**
 * A tiny external store around the two places the theme actually lives:
 * localStorage (the visitor's choice) and <html>'s class list (what is
 * currently painted). The pre-paint script in the root layout owns the initial
 * decision, so React only ever reads it back — it never has to guess and never
 * fights the DOM.
 */
const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) listener();
}

function storedTheme(): Theme {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") return stored;
  } catch {
    // Storage unavailable (private mode) — fall back to the OS preference.
  }
  return "system";
}

function applyTheme(theme: Theme): ResolvedTheme {
  const resolved =
    theme === "system" ? (window.matchMedia(DARK_QUERY).matches ? "dark" : "light") : theme;
  const root = document.documentElement;
  root.classList.toggle("dark", resolved === "dark");
  root.classList.toggle("light", resolved === "light");
  root.dataset.theme = resolved;
  root.style.colorScheme = resolved;
  return resolved;
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  const media = window.matchMedia(DARK_QUERY);
  // Follow live OS changes while the visitor is still on "system".
  const onMediaChange = () => {
    if (storedTheme() === "system") applyTheme("system");
    notify();
  };
  // Keep other tabs of this site in sync.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY) return;
    applyTheme(storedTheme());
    notify();
  };

  media.addEventListener("change", onMediaChange);
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    media.removeEventListener("change", onMediaChange);
    window.removeEventListener("storage", onStorage);
  };
}

/**
 * Reads the theme the pre-paint script already applied. Returns `null` on the
 * server and during hydration so server output and the first client render are
 * byte-identical; React re-reads the store immediately after hydrating.
 */
function getAppliedThemeSnapshot(): ResolvedTheme | null {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerThemeSnapshot(): ResolvedTheme | null {
  return null;
}

type ThemeContextValue = {
  resolvedTheme: ResolvedTheme | null;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const resolvedTheme = useSyncExternalStore(
    subscribe,
    getAppliedThemeSnapshot,
    getServerThemeSnapshot,
  );

  const setTheme = useCallback((next: Theme) => {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Unwritable storage still lets the theme apply for this page view.
    }
    applyTheme(next);
    notify();
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "light" : "dark");
  }, [setTheme]);

  const value = useMemo(
    () => ({ resolvedTheme, setTheme, toggleTheme }),
    [resolvedTheme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a <ThemeProvider>");
  return context;
}
