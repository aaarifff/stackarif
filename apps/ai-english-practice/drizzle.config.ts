import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";
import { validateDatabaseUrl } from "./src/db/config";

// Match Next.js precedence while preserving variables supplied by the environment.
config({ path: [".env.local", ".env"], quiet: true });

const databaseUrl = validateDatabaseUrl(process.env.DATABASE_URL);

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: { url: databaseUrl },
});
