export const THEME_STORAGE_KEY = "clienttalk-theme";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export const DARK_QUERY = "(prefers-color-scheme: dark)";

/**
 * Runs before the first paint, from an inline <script> in <head>, so the page
 * never flashes the wrong theme. It resolves the stored choice (falling back to
 * the OS preference on a first visit) and stamps `class`, `data-theme` and
 * `color-scheme` on <html> synchronously.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});var t=(s==="light"||s==="dark")?s:(window.matchMedia(${JSON.stringify(
  DARK_QUERY,
)}).matches?"dark":"light");var e=document.documentElement;e.classList.toggle("dark",t==="dark");e.classList.toggle("light",t==="light");e.dataset.theme=t;e.style.colorScheme=t;}catch(_){}})();`;
