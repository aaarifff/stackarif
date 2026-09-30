import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { handleApiError } from "@/lib/api";
import { deleteSession, getFullSession } from "@/server/services/sessionService";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser();
    const { id } = await params;
    const result = await getFullSession(id, user.id);
    return NextResponse.json(result);
  } catch (err) {
    return handleApiError(err);
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser();
    const { id } = await params;
    await deleteSession({ userId: user.id, sessionId: id });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return handleApiError(err);
  }
}
