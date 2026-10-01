import { NextResponse } from "next/server";
import { z } from "zod";
import { desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { vocabularyItems } from "@/db/schema";
import { requireUser } from "@/lib/auth";
import { handleApiError } from "@/lib/api";

export const dynamic = "force-dynamic";

const schema = z.object({
  phrase: z.string().trim().min(1).max(200),
  meaning: z.string().trim().max(500).optional().default(""),
  meaningBn: z.string().trim().max(500).nullable().optional(),
  topic: z.string().trim().max(80).nullable().optional(),
  example: z.string().trim().max(500).nullable().optional(),
  sourceSessionId: z.string().uuid().nullable().optional(),
  sourceMessageId: z.string().uuid().nullable().optional(),
});

export async function GET() {
  try {
    const user = await requireUser();
    const rows = await getDb()
      .select()
      .from(vocabularyItems)
      .where(eq(vocabularyItems.userId, user.id))
      .orderBy(desc(vocabularyItems.createdAt));
    return NextResponse.json({ items: rows });
  } catch (err) {
    return handleApiError(err);
  }
}

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const body = schema.parse(await req.json());
    const [item] = await getDb()
      .insert(vocabularyItems)
      .values({
        userId: user.id,
        phrase: body.phrase,
        meaning: body.meaning || "",
        meaningBn: body.meaningBn ?? null,
        topic: body.topic ?? null,
        example: body.example ?? null,
        sourceSessionId: body.sourceSessionId ?? null,
        sourceMessageId: body.sourceMessageId ?? null,
      })
      .returning();
    return NextResponse.json({ item });
  } catch (err) {
    return handleApiError(err);
  }
}
