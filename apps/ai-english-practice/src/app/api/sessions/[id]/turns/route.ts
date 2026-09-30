import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { handleApiError } from "@/lib/api";
import { submitTurn } from "@/server/services/sessionService";

export const dynamic = "force-dynamic";

const schema = z.object({
  clientRequestId: z.string().min(1),
  text: z.string().min(1).max(2000),
  inputMode: z.enum(["text", "voice"]).default("text"),
  rawTranscript: z.string().nullable().optional(),
  edited: z.boolean().default(false),
  assisted: z.boolean().default(false),
  usedSuggestionKind: z.enum(["direct", "clarify", "next_step"]).nullable().optional(),
  audioDurationMs: z.number().int().min(0).max(120000).nullable().optional(),
});

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser();
    const { id } = await params;
    const body = schema.parse(await req.json());

    const result = await submitTurn({
      userId: user.id,
      sessionId: id,
      clientRequestId: body.clientRequestId,
      text: body.text.trim(),
      inputMode: body.inputMode,
      rawTranscript: body.rawTranscript ?? null,
      edited: body.edited,
      assisted: body.assisted,
      usedSuggestionKind: body.usedSuggestionKind ?? null,
      audioDurationMs: body.audioDurationMs ?? null,
    });

    return NextResponse.json(result);
  } catch (err) {
    return handleApiError(err);
  }
}
