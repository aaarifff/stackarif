export function validateDatabaseUrl(value: string | undefined): string {
  const help =
    "Set DATABASE_URL in your deployment environment (or .env locally) to the complete PostgreSQL URI from Supabase > Connect > Session pooler. Keep the hostname, port, and /postgres ending, and URL-encode special characters in the password.";

  if (!value?.trim()) {
    throw new Error(`DATABASE_URL is missing. ${help}`);
  }

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    // Never include the connection string or parser error: they contain credentials.
    throw new Error(`DATABASE_URL is not a valid URL. ${help}`);
  }

  if (
    !["postgres:", "postgresql:"].includes(url.protocol) ||
    !url.hostname ||
    !url.username ||
    url.pathname.length <= 1 ||
    url.hash ||
    url.hostname.startsWith("0.") ||
    /\[YOUR-PASSWORD\]|YOUR_PASSWORD|YOUR_HOST|POOLER_HOST/i.test(value)
  ) {
    throw new Error(`DATABASE_URL is incomplete or malformed. ${help}`);
  }

  return value;
}
