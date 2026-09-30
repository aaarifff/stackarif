# AI English Practice

This project uses pnpm 9.0.0, matching the parent workspace.

Configure `.env` before starting (use `.env.example` as a template):

- `DATABASE_URL`: Supabase dashboard → Connect → Session pooler → PostgreSQL URI. Replace the password placeholder with your URL-encoded database password.
- `GEMINI_API_KEY`: a Gemini API key from Google AI Studio. Groq keys (`gsk_`) are not compatible.
- `GEMINI_MODEL`: defaults to `gemini-3.5-flash-lite`. Some larger Flash models intermittently return `503 UNAVAILABLE` for schema-constrained (structured output) requests, which makes every practice turn fall back to a canned reply. If you switch models, verify structured output works for that model.

The app uses Drizzle to connect to Supabase PostgreSQL and manages its own login sessions. The saved `NEXT_PUBLIC_SUPABASE_*` values alone do not connect the database and are currently unused by application code. Both the app and Drizzle CLI read `DATABASE_URL`. `.env.local`, if present, takes precedence over `.env`. Restart the dev server after updating configuration.

For a new database, run `pnpm db:generate`, review the generated SQL in `drizzle/`, then run `pnpm db:migrate` to create the tables. These commands require `DATABASE_URL` to be set. Since database access happens on the server, disable the Supabase Data API if it is not needed, so the application tables are not exposed through that API.

Keep `.env` private; it is ignored by Git.

## Theming

The UI has light and dark themes, modelled on the [Plasma](https://plasma-astro-template.vercel.app/) shadcn/ui template. Colours come from semantic tokens defined once in `src/app/globals.css` (`--background`, `--card`, `--border`, `--primary`, `--muted`, `--brand`, plus `--danger` / `--warning` / `--success`), exposed to Tailwind through `@theme inline`. Components use the generated utilities (`bg-card`, `text-muted-foreground`, `border-border`, …) instead of raw palette classes such as `bg-slate-50`, so a token change re-themes the whole app.

The active theme lives in the `dark` class on `<html>` and is stored in `localStorage` under `clienttalk-theme`. An inline script in the root layout (`THEME_INIT_SCRIPT` in `src/lib/theme.ts`) applies it before the first paint, so there is no flash of the wrong theme. `ThemeProvider` reads that state back through `useSyncExternalStore` and follows live OS changes while the visitor has not chosen a theme, so the default really is the system preference. The sun/moon toggle is rendered un-hydrated from CSS alone (both icons are in the DOM; the theme decides which one is visible), which keeps server and client markup identical.

To retune a theme, edit the `:root` (light) or `.dark` block in `globals.css`. Dark neutrals are intentionally one step lighter than the reference template's near-black values so cards stay distinguishable from the page; keep text/surface pairs at a 4.5:1 contrast ratio or better.

Install dependencies and start the development server:

```sh
pnpm install
pnpm dev
```

Open http://localhost:3000.

Other commands:

```sh
pnpm lint
pnpm typecheck
pnpm build
pnpm start
```

For CI, use `pnpm install --frozen-lockfile`.
