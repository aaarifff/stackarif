import { NextResponse } from "next/server";
import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { vocabularyItems } from "@/db/schema";
import { requireUser } from "@/lib/auth";
import { handleApiError } from "@/lib/api";
import { NotFoundError } from "@/server/services/sessionService";

export const dynamic = "force-dynamic";

const schema = z.object({
  phrase: z.string().trim().min(1).max(200).optional(),
  meaning: z.string().trim().max(500).optional(),
  meaningBn: z.string().trim().max(500).nullable().optional(),
  topic: z.string().trim().max(80).nullable().optional(),
  example: z.string().trim().max(500).nullable().optional(),
  practiced: z.boolean().optional(),
  markReviewed: z.boolean().optional(),
});

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser();
    const { id } = await params;
    const body = schema.parse(await req.json());

    const existing = await getDb()
      .select()
      .from(vocabularyItems)
      .where(and(eq(vocabularyItems.id, id), eq(vocabularyItems.userId, user.id)))
      .limit(1);
    if (existing.length === 0) throw new NotFoundError("Vocabulary item not found");

    const { markReviewed, ...rest } = body;
    const updates: Record<string, unknown> = { ...rest };
    if (markReviewed) {
      updates.lastReviewedAt = new Date();
    }

    const [updated] = await getDb()
      .update(vocabularyItems)
      .set(updates)
      .where(and(eq(vocabularyItems.id, id), eq(vocabularyItems.userId, user.id)))
      .returning();

    return NextResponse.json({ item: updated });
  } catch (err) {
    return handleApiError(err);
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser();
    const { id } = await params;
    await getDb().delete(vocabularyItems).where(and(eq(vocabularyItems.id, id), eq(vocabularyItems.userId, user.id)));
    return NextResponse.json({ ok: true });
  } catch (err) {
    return handleApiError(err);
  }
}
