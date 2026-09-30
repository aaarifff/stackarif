import { NextResponse } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { requireUser } from "@/lib/auth";
import { handleApiError } from "@/lib/api";

export const dynamic = "force-dynamic";

const schema = z.object({
  displayName: z.string().trim().min(1).max(80).optional(),
  level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
  explanationLanguage: z.enum(["none", "bn"]).optional(),
  interests: z.array(z.string()).optional(),
  dailyGoalMinutes: z.number().int().min(1).max(120).optional(),
  onboarded: z.boolean().optional(),
});

export async function PATCH(req: Request) {
  try {
    const user = await requireUser();
    const body = schema.parse(await req.json());

    const [updated] = await db
      .update(users)
      .set(body)
      .where(eq(users.id, user.id))
      .returning();

    return NextResponse.json({
      user: {
        id: updated.id,
        email: updated.email,
        displayName: updated.displayName,
        level: updated.level,
        explanationLanguage: updated.explanationLanguage,
        interests: updated.interests,
        dailyGoalMinutes: updated.dailyGoalMinutes,
        onboarded: updated.onboarded,
      },
    });
  } catch (err) {
    return handleApiError(err);
  }
}

export async function DELETE() {
  try {
    const user = await requireUser();
    await db.delete(users).where(eq(users.id, user.id));
    const res = NextResponse.json({ ok: true });
    res.cookies.delete("clienttalk_session");
    return res;
  } catch (err) {
    return handleApiError(err);
  }
}
