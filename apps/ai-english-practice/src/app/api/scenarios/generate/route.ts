import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/db";
import { customScenarios } from "@/db/schema";
import { requireUser } from "@/lib/auth";
import { handleApiError } from "@/lib/api";
import { generateScenarioFromJob } from "@/server/ai/gemini";
import { reserveAiRequest } from "@/server/usage";
import { getPracticeLevel, getPracticeTheme } from "@/content/themes";

export const dynamic = "force-dynamic";

const schema = z
  .object({
    jobText: z
      .string()
      .trim()
      .max(8000, "That job description is too long. Please paste the main part.")
      .default(""),
    /** Practice theme id; when set, no job post is needed. */
    theme: z
      .string()
      .refine((value) => Boolean(getPracticeTheme(value)), "Unknown practice theme.")
      .nullable()
      .optional(),
    level: z.enum(["normal", "medium", "hard"]).default("normal"),
  })
  .refine((body) => Boolean(body.theme) || body.jobText.length >= 50, {
    path: ["jobText"],
    message: "Paste a bit more of the job description (at least 50 characters).",
  });

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const body = schema.parse(await req.json());
    const level = getPracticeLevel(body.level);

    await reserveAiRequest(user.id);

    const scenario = await generateScenarioFromJob({
      jobText: body.jobText,
      themeId: body.theme ?? null,
      difficulty: level?.difficulty ?? null,
      explanationLanguage: user.explanationLanguage === "bn" ? "bn" : "none",
    });

    await getDb().insert(customScenarios).values({
      id: scenario.id,
      userId: user.id,
      title: scenario.title,
      category: scenario.category,
      categoryLabel: scenario.categoryLabel,
      scenario,
      sourceText: scenario.sourceText ?? null,
    });

    return NextResponse.json({ scenario });
  } catch (err) {
    return handleApiError(err);
  }
}
