import type { Difficulty, PracticeThemeId } from "@/lib/types";

/**
 * A self-contained practice topic, generated on demand instead of coming from
 * the freelance scenario library. `partner` and `focus` go straight into the
 * generation prompt, so keep them written as instructions to the model.
 */
export interface PracticeTheme {
  id: PracticeThemeId;
  label: string;
  blurb: string;
  /** Who the AI plays in this theme. */
  partner: string;
  /** What the conversation should cover. */
  focus: string;
  categoryLabel: string;
  /** Extra hard rules for the generator (copyright, safety, accuracy). */
  cautions?: string;
}

export const PRACTICE_THEMES: PracticeTheme[] = [
  {
    id: "history",
    label: "History",
    blurb: "Talk through historical events, why they happened and what followed.",
    partner: "a curious conversation partner who enjoys discussing history and asks the learner to explain events in their own words",
    focus: "history: key events, their causes and consequences, timelines, and comparisons between different periods or places",
    categoryLabel: "History Talk",
    cautions: "Keep dates and names factually accurate. Prefer well-documented events over disputed details.",
  },
  {
    id: "quotes",
    label: "Quotes",
    blurb: "Discuss what famous quotations mean and when to use them.",
    partner: "a thoughtful conversation partner who likes talking about well-known quotations",
    focus: "famous quotations: what a line means, who said it, and how it applies to everyday situations",
    categoryLabel: "Famous Quotes",
    cautions:
      "Use only short, widely documented quotations. Never invent an attribution — if you are not certain who said a line, describe the idea instead of crediting anyone.",
  },
  {
    id: "ielts",
    label: "IELTS Practice",
    blurb: "Practise IELTS Speaking-style questions with follow-ups.",
    partner: "an IELTS speaking examiner conducting a friendly mock speaking test",
    focus:
      "IELTS Speaking: part 1 questions on familiar topics, a part 2 cue-card style long answer, and part 3 abstract follow-up questions",
    categoryLabel: "IELTS Speaking",
    cautions: "Keep the examiner warm and encouraging rather than intimidating, and never mention a real band score.",
  },
  {
    id: "vocabulary",
    label: "Advanced Words",
    blurb: "Use advanced vocabulary in sentences of your own.",
    partner: "a patient language coach who introduces advanced words and gets the learner to use them",
    focus: "advanced vocabulary: precise word choice, common collocations, and using each new word in the learner's own sentence",
    categoryLabel: "Advanced Vocabulary",
  },
  {
    id: "poems",
    label: "Poems",
    blurb: "Explore short poems and put feelings into words.",
    partner: "a poetry lover who shares short verses and asks what they mean to the learner",
    focus: "poetry: imagery, rhythm, and describing feelings and interpretations of short verse",
    categoryLabel: "Poetry",
    cautions:
      "Quote at most a short line or two, and only from public-domain or self-written lines. Never reproduce a full copyrighted poem.",
  },
  {
    id: "medical",
    label: "Medical",
    blurb: "Practise medical English: symptoms, treatment and care.",
    partner: "a healthcare professional talking through a routine fictional consultation",
    focus: "medical English: describing symptoms, explaining a diagnosis or treatment plan, and reassuring a patient",
    categoryLabel: "Medical English",
    cautions:
      "This is language practice, not medical advice. Keep every case fictional and routine, and never give real diagnosis or dosage guidance.",
  },
];

export function getPracticeTheme(id: string | null | undefined): PracticeTheme | undefined {
  if (!id) return undefined;
  return PRACTICE_THEMES.find((theme) => theme.id === id);
}

export type PracticeLevelId = "normal" | "medium" | "hard";

/**
 * The learner-facing levels. Each maps onto the app's existing difficulty scale,
 * which is what actually steers the AI's language.
 */
export const PRACTICE_LEVELS: { id: PracticeLevelId; label: string; difficulty: Difficulty; blurb: string }[] = [
  {
    id: "normal",
    label: "Normal",
    difficulty: "beginner",
    blurb: "Everyday words, short sentences, one question at a time.",
  },
  {
    id: "medium",
    label: "Medium",
    difficulty: "intermediate",
    blurb: "Fuller answers, follow-up questions, some new vocabulary.",
  },
  {
    id: "hard",
    label: "Hard",
    difficulty: "advanced",
    blurb: "Faster pace, abstract questions, richer vocabulary.",
  },
];

export function getPracticeLevel(id: string | null | undefined) {
  return PRACTICE_LEVELS.find((level) => level.id === id);
}

export function levelForDifficulty(difficulty: string | null | undefined): PracticeLevelId {
  return PRACTICE_LEVELS.find((level) => level.difficulty === difficulty)?.id ?? "normal";
}
