export type Difficulty = "beginner" | "intermediate" | "advanced";
export type Personality =
  | "friendly"
  | "busy"
  | "nontechnical"
  | "skeptical"
  | "budget-conscious";

/** Non-business practice themes, each also used as a scenario category. */
export type PracticeThemeId = "history" | "quotes" | "ielts" | "vocabulary" | "poems" | "medical";

export type ScenarioCategory =
  | "website"
  | "google-ads"
  | "tracking"
  | "meta-ads"
  | "tiktok-ads"
  | "reporting"
  | PracticeThemeId;

export interface VocabularyEntry {
  phrase: string;
  meaning: string;
  meaningBn?: string;
}

export interface DialogueTurn {
  speaker: "client" | "freelancer";
  text: string;
}

export type ScenarioSource = "library" | "custom";

export interface Scenario {
  id: string;
  version: number;
  category: ScenarioCategory;
  categoryLabel: string;
  title: string;
  situation: string;
  learnerGoal: string;
  difficultyDefault: Difficulty;
  estimatedMinutes: number;
  brief: string;
  persona: {
    name: string;
    role: string;
    business: string;
    traits: string[];
  };
  facts: Record<string, string>;
  hiddenFacts?: Record<string, string>;
  openingMessage: string;
  objectives: string[];
  vocabulary: VocabularyEntry[];
  sampleDialogue: DialogueTurn[];
  completionGuidance: string;
  /** Set when the scenario was generated from a practice theme rather than a job post. */
  theme?: PracticeThemeId | null;
  /** "custom" for scenarios generated from a pasted job post; omitted for built-ins. */
  source?: ScenarioSource;
  /** The original job description a custom scenario was generated from. */
  sourceText?: string | null;
}

export interface SuggestionCard {
  kind: "direct" | "clarify" | "next_step";
  text: string;
  why: string;
  meaningBn?: string | null;
}

export interface TurnGenerationResult {
  clientMessage: string;
  suggestions: SuggestionCard[];
  objectiveUpdates: string[];
  sessionCompleteSuggested: boolean;
}

export interface ReviewResult {
  strengths: string[];
  improvements: string[];
  usefulPhrases: string[];
  objectives: { objective: string; completed: boolean; evidence: string | null }[];
  scores: Record<
    "clarity" | "grammar" | "vocabulary" | "professionalTone" | "objectiveCompletion",
    number | null
  >;
  recommendedScenarioId: string | null;
}
