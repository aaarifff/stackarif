import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { handleApiError } from "@/lib/api";
import { retrySuggestions } from "@/server/services/sessionService";

export const dynamic = "force-dynamic";

const schema = z.object({
  clientMessageId: z.string().uuid(),
});

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser();
    const { id } = await params;
    const body = schema.parse(await req.json());
    const suggestions = await retrySuggestions({ userId: user.id, sessionId: id, clientMessageId: body.clientMessageId });
    return NextResponse.json({ suggestions });
  } catch (err) {
    return handleApiError(err);
  }
}
