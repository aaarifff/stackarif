// @ts-check
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: process.env.SITE || "https://example.com",
  base: process.env.BASE || "/",
  trailingSlash: "ignore",
  integrations: [sitemap()],
});
