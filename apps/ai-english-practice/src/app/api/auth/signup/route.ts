import { NextResponse } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { users } from "@/db/schema";
import { createSession, hashPassword, SESSION_COOKIE, SESSION_MAX_AGE_SECONDS } from "@/lib/auth";
import { handleApiError } from "@/lib/api";

export const dynamic = "force-dynamic";

const schema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8, "Password must be at least 8 characters."),
  displayName: z.string().trim().min(1).max(80).optional(),
});

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json());

    const existing = await getDb().select().from(users).where(eq(users.email, body.email)).limit(1);
    if (existing.length > 0) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    }

    const [user] = await getDb()
      .insert(users)
      .values({
        email: body.email,
        passwordHash: hashPassword(body.password),
        displayName: body.displayName || body.email.split("@")[0],
      })
      .returning();

    const token = await createSession(user.id);

    const res = NextResponse.json({ user: { id: user.id, email: user.email, onboarded: user.onboarded } });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: SESSION_MAX_AGE_SECONDS,
    });
    return res;
  } catch (err) {
    return handleApiError(err);
  }
}
