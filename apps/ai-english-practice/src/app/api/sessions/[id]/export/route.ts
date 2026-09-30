import { requireUser } from "@/lib/auth";
import { handleApiError } from "@/lib/api";
import { exportSessionMarkdown } from "@/server/services/sessionService";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser();
    const { id } = await params;
    const markdown = await exportSessionMarkdown({ userId: user.id, sessionId: id });
    return new Response(markdown, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Content-Disposition": `attachment; filename="clienttalk-session-${id}.md"`,
      },
    });
  } catch (err) {
    return handleApiError(err);
  }
}
