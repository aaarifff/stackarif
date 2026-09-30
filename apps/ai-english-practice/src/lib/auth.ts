import { randomBytes, randomUUID, scryptSync, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { authSessions, users } from "@/db/schema";

export const SESSION_COOKIE = "clienttalk_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const hashBuffer = Buffer.from(hash, "hex");
  const candidate = scryptSync(password, salt, 64);
  if (candidate.length !== hashBuffer.length) return false;
  return timingSafeEqual(candidate, hashBuffer);
}

export type AuthUser = typeof users.$inferSelect;

export async function createSession(userId: string): Promise<string> {
  const token = randomUUID() + randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
  await db.insert(authSessions).values({ id: token, userId, expiresAt });
  return token;
}

export async function destroySession(token: string): Promise<void> {
  await db.delete(authSessions).where(eq(authSessions.id, token));
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const rows = await db
    .select({ user: users, session: authSessions })
    .from(authSessions)
    .innerJoin(users, eq(authSessions.userId, users.id))
    .where(eq(authSessions.id, token))
    .limit(1);

  const row = rows[0];
  if (!row) return null;
  if (row.session.expiresAt.getTime() < Date.now()) {
    await destroySession(token);
    return null;
  }
  return row.user;
}

export async function requireUser(): Promise<AuthUser> {
  const user = await getCurrentUser();
  if (!user) {
    throw new AuthError("Not authenticated");
  }
  return user;
}

export class AuthError extends Error {}

export const SESSION_MAX_AGE_SECONDS = SESSION_TTL_MS / 1000;
