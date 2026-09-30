import { NextResponse } from "next/server";
import { z } from "zod";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { practiceSessions } from "@/db/schema";
import { requireUser } from "@/lib/auth";
import { handleApiError } from "@/lib/api";
import { createPracticeSession } from "@/server/services/sessionService";

export const dynamic = "force-dynamic";

const schema = z.object({
  scenarioId: z.string(),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  personality: z.enum(["friendly", "busy", "nontechnical", "skeptical", "budget-conscious"]),
  explanationLanguage: z.enum(["none", "bn"]).default("none"),
});

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const body = schema.parse(await req.json());
    const result = await createPracticeSession({ userId: user.id, ...body });
    return NextResponse.json(result);
  } catch (err) {
    return handleApiError(err);
  }
}

export async function GET() {
  try {
    const user = await requireUser();
    const rows = await db
      .select()
      .from(practiceSessions)
      .where(eq(practiceSessions.userId, user.id))
      .orderBy(desc(practiceSessions.startedAt));
    return NextResponse.json({ sessions: rows });
  } catch (err) {
    return handleApiError(err);
  }
}
