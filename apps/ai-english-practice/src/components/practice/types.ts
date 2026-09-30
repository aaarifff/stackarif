import type { Scenario } from "@/lib/types";

export interface SuggestionOption {
  text: string;
  why: string;
  meaningBn?: string | null;
}

export interface MessageSuggestions {
  id: string;
  direct: SuggestionOption;
  clarify: SuggestionOption;
  nextStep: SuggestionOption;
}

export interface PracticeMessage {
  id: string;
  turnIndex: number;
  role: "client" | "user";
  submittedText: string;
  inputMode: string;
  edited: boolean;
  assisted: boolean;
  createdAt: string;
  suggestions: MessageSuggestions | null;
}

export interface PracticeSessionData {
  session: {
    id: string;
    scenarioId: string;
    difficulty: string;
    personality: string;
    explanationLanguage: string;
    status: string;
    startedAt: string;
  };
  scenario: Scenario;
  messages: PracticeMessage[];
}
