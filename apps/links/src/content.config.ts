import type { Loader } from "astro/loaders";
import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const listingSchema = z.object({
  name: z.string(),
  slug: z.string(),
  url: z.string().url(),
  description: z.string().default(""),
  category: z.string().optional(),
  rating: z.number().min(0).max(10).nullable().default(null),
  featured: z.boolean().default(false),
  favicon: z.string().default(""),
});

const categorySchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string().default(""),
  icon: z.string().default(""),
  order: z.number().default(0),
});

const pageSchema = z.object({
  title: z.string(),
  slug: z.string(),
  body: z.string().default(""),
  inFooter: z.boolean().default(true),
  order: z.number().default(0),
});

function apiBase(): string | null {
  const raw = import.meta.env.DIRECTORY_API ?? process.env.DIRECTORY_API;
  if (!raw) return null;

  const trimmed = String(raw).trim().replace(/\/+$/, "");
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

/**
 * Pull every page of a devarifhossain Directory collection endpoint.
 *
 * The API caps per_page at 100, so a directory larger than that needs paging —
 * getting this wrong silently truncates the site to its first hundred entries.
 */
async function fetchAll(base: string, path: string): Promise<any[]> {
  const out: any[] = [];
  let page = 1;

  for (;;) {
    const res = await fetch(
      `${base}${path}${path.includes("?") ? "&" : "?"}per_page=100&page=${page}`,
    );
    if (!res.ok) {
      throw new Error(`${path} returned ${res.status}`);
    }

    const body = await res.json();
    const rows = Array.isArray(body.data) ? body.data : [];
    out.push(...rows);

    const pages = body.meta?.pages ?? 1;
    if (page >= pages || rows.length === 0) break;
    page++;
  }

  return out;
}

function directoryLoader(kind: "listings" | "categories" | "pages"): Loader {
  return {
    name: `devarifhossain-directory-${kind}`,
    load: async ({ store, logger, parseData, generateDigest }) => {
      const base = apiBase();

      if (!base) {
        logger.info(
          `${kind}: using local JSON (set DIRECTORY_API to fetch instead)`,
        );
        return;
      }

      logger.info(`${kind}: fetching from ${base}`);
      store.clear();

      const rows = await fetchAll(base, `/api/v1/${kind}`);

      for (const row of rows) {
        let mapped: Record<string, unknown>;

        if (kind === "listings") {
          mapped = {
            name: row.name,
            slug: row.slug,
            url: row.url,
            description: row.description ?? "",
            category: row.category?.slug ?? undefined,
            rating: row.rating ?? null,
            featured: Boolean(row.featured),
            favicon: row.favicon ?? "",
          };
        } else if (kind === "categories") {
          mapped = {
            name: row.name,
            slug: row.slug,
            description: row.description ?? "",
            icon: row.icon ?? "",
            order: 0,
          };
        } else {
          // The collection endpoint omits body — it would bloat a list nobody
          // reads in full — so each page is fetched individually for its HTML.
          const res = await fetch(`${base}/api/v1/pages/${row.slug}`);
          if (!res.ok) {
            logger.warn(`pages: skipping ${row.slug} (${res.status})`);
            continue;
          }
          const full = (await res.json()).data ?? {};
          mapped = {
            title: full.title ?? row.title,
            slug: row.slug,
            body: full.body ?? "",
            inFooter: Boolean(full.in_footer ?? row.in_footer),
            order: Number(full.order ?? row.order ?? 0),
          };
        }

        const data = await parseData({ id: row.slug, data: mapped });
        store.set({ id: row.slug, data, digest: generateDigest(data) });
      }

      logger.info(`${kind}: ${rows.length} loaded`);
    },
  };
}

function localListingsLoader(): Loader {
  return {
    name: "local-listings-json",
    load: async ({ store, parseData, generateDigest }) => {
      const directory = join(process.cwd(), "src/content/listings");
      const files = (await readdir(directory)).filter((file) =>
        file.endsWith(".json"),
      );

      store.clear();

      for (const file of files) {
        const contents = await readFile(join(directory, file), "utf8");
        const parsed = JSON.parse(contents) as
          | Record<string, unknown>
          | Record<string, unknown>[];
        const fileCategory = Array.isArray(parsed)
          ? undefined
          : typeof parsed.category === "string"
            ? parsed.category
            : undefined;
        const rows = Array.isArray(parsed)
          ? parsed
          : Array.isArray(parsed.listings)
            ? parsed.listings
            : [parsed];

        for (const row of rows) {
          if (Array.isArray(row.listings)) {
            for (const listing of row.listings) {
              const data = await parseData({
                id: String(listing.slug),
                data:
                  row.category && !listing.category
                    ? { ...listing, category: row.category }
                    : listing,
              });
              store.set({
                id: String(listing.slug),
                data,
                digest: generateDigest(data),
              });
            }
            continue;
          }

          const data = await parseData({
            id: String(row.slug),
            data:
              fileCategory && !row.category
                ? { ...row, category: fileCategory }
                : row,
          });
          store.set({
            id: String(row.slug),
            data,
            digest: generateDigest(data),
          });
        }
      }
    },
  };
}

function localCategoriesLoader(): Loader {
  return {
    name: "local-categories-json",
    load: async ({ store, parseData, generateDigest }) => {
      const file = join(
        process.cwd(),
        "src/content/categories/categories.json",
      );
      const parsed = JSON.parse(await readFile(file, "utf8")) as
        | Record<string, unknown>
        | Record<string, unknown>[];
      const rows = Array.isArray(parsed) ? parsed : [parsed];

      store.clear();

      for (const row of rows) {
        const data = await parseData({ id: String(row.slug), data: row });
        store.set({ id: String(row.slug), data, digest: generateDigest(data) });
      }
    },
  };
}

const listings = defineCollection({
  loader: apiBase() ? directoryLoader("listings") : localListingsLoader(),
  schema: listingSchema,
});

const categories = defineCollection({
  loader: apiBase() ? directoryLoader("categories") : localCategoriesLoader(),
  schema: categorySchema,
});

const pages = defineCollection({
  loader: apiBase()
    ? directoryLoader("pages")
    : glob({ pattern: "**/*.json", base: "./src/content/pages" }),
  schema: pageSchema,
});

export const collections = { listings, categories, pages };
