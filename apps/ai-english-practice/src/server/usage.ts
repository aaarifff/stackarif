import { and, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { usageCounters } from "@/db/schema";

export const DAILY_AI_REQUEST_LIMIT = Number(process.env.DAILY_AI_REQUEST_LIMIT || 150);

function todayString(): string {
  return new Date().toISOString().slice(0, 10);
}

export class UsageLimitError extends Error {
  constructor() {
    super("Daily practice limit reached. Please try again tomorrow.");
  }
}

/** Reserve one AI request for the user's daily quota. Throws if the limit is reached. */
export async function reserveAiRequest(userId: string): Promise<void> {
  const day = todayString();

  const existing = await db
    .select()
    .from(usageCounters)
    .where(and(eq(usageCounters.userId, userId), eq(usageCounters.day, day)))
    .limit(1);

  if (existing.length === 0) {
    await db
      .insert(usageCounters)
      .values({ userId, day, aiRequests: 1 })
      .onConflictDoUpdate({
        target: [usageCounters.userId, usageCounters.day],
        set: { aiRequests: sql`${usageCounters.aiRequests} + 1` },
      });
    return;
  }

  if (existing[0].aiRequests >= DAILY_AI_REQUEST_LIMIT) {
    throw new UsageLimitError();
  }

  await db
    .update(usageCounters)
    .set({ aiRequests: sql`${usageCounters.aiRequests} + 1` })
    .where(and(eq(usageCounters.userId, userId), eq(usageCounters.day, day)));
}

export async function getUsageToday(userId: string): Promise<{ used: number; limit: number }> {
  const day = todayString();
  const existing = await db
    .select()
    .from(usageCounters)
    .where(and(eq(usageCounters.userId, userId), eq(usageCounters.day, day)))
    .limit(1);
  return { used: existing[0]?.aiRequests ?? 0, limit: DAILY_AI_REQUEST_LIMIT };
}
