import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { AuthError } from "@/lib/auth";
import { ForbiddenError, NotFoundError, ValidationError } from "@/server/services/sessionService";
import { UsageLimitError } from "@/server/usage";

export function handleApiError(err: unknown): NextResponse {
  if (err instanceof AuthError) {
    return NextResponse.json({ error: "Please sign in to continue." }, { status: 401 });
  }
  if (err instanceof ForbiddenError) {
    return NextResponse.json({ error: "You do not have access to this resource." }, { status: 403 });
  }
  if (err instanceof NotFoundError) {
    return NextResponse.json({ error: err.message || "Not found." }, { status: 404 });
  }
  if (err instanceof ValidationError) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
  if (err instanceof UsageLimitError) {
    return NextResponse.json({ error: err.message }, { status: 429 });
  }
  if (err instanceof ZodError) {
    return NextResponse.json({ error: err.issues[0]?.message || "Invalid request." }, { status: 400 });
  }
  console.error(err);
  return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
}
