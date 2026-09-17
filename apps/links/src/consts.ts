const env = (key: string, fallback: string): string =>
  (import.meta.env[key] as string | undefined)?.trim() || fallback;

export const SITE_TITLE = env("SITE_TITLE", "All LinkS | Stack Arif");
export const SITE_TAGLINE = env(
  "SITE_TAGLINE",
  "Make your Mind as a Directory",
);
export const SITE_DESCRIPTION = env(
  "SITE_DESCRIPTION",
  "A ranked link directory: categories of listings with ratings, search and filtering.",
);

/** Listings shown inside each category box on the home page. */
export const PER_CATEGORY = Number(env("PER_CATEGORY", "10"));

export const PER_PAGE = Number(env("PER_PAGE", "30"));

export const COUNT_CLICKS = Boolean(import.meta.env.DIRECTORY_API);
