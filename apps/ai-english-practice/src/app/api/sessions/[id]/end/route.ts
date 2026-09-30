import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { handleApiError } from "@/lib/api";
import { endSession } from "@/server/services/sessionService";

export const dynamic = "force-dynamic";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser();
    const { id } = await params;
    const review = await endSession({ userId: user.id, sessionId: id });
    return NextResponse.json({ review });
  } catch (err) {
    return handleApiError(err);
  }
}
