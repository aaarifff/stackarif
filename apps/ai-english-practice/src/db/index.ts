import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { validateDatabaseUrl } from "./config";

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

let database: ReturnType<typeof drizzle> | undefined;

// Next.js imports routes during builds; initialize only when a request needs DB access.
export function getDb() {
  if (database) return database;

  const databaseUrl = validateDatabaseUrl(process.env.DATABASE_URL);
  const pool = globalForDb.__arenaNextJsPostgresqlPool ?? new Pool({
    connectionString: databaseUrl,
  });

  if (process.env.NODE_ENV !== "production") {
    globalForDb.__arenaNextJsPostgresqlPool = pool;
  }

  database = drizzle(pool);
  return database;
}
