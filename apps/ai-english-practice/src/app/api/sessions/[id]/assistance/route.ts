import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { assistanceEvents } from "@/db/schema";
import { requireUser } from "@/lib/auth";
import { handleApiError } from "@/lib/api";

export const dynamic = "force-dynamic";

const schema = z.object({
  clientMessageId: z.string().uuid().nullable().optional(),
  eventType: z.enum(["viewed", "used", "practiced_aloud", "hidden", "revealed"]),
  suggestionKind: z.enum(["direct", "clarify", "next_step"]).nullable().optional(),
});

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser();
    const { id } = await params;
    const body = schema.parse(await req.json());
    void user;
    await db.insert(assistanceEvents).values({
      sessionId: id,
      clientMessageId: body.clientMessageId ?? null,
      eventType: body.eventType,
      suggestionKind: body.suggestionKind ?? null,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return handleApiError(err);
  }
}
