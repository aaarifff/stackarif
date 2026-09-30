export const DURATIONS = [15, 30, 60, 120] as const;
export const WORD_COUNTS = [10, 25, 50, 100] as const;
export const LEVELS = ['normal', 'medium', 'hard'] as const;
export const CATEGORIES = {
  common: 'Common words', history: 'History', quote: 'Quote', ielts: 'IELTS practice',
  advanced: 'Advanced words', poem: 'Poem', medical: 'Medical',
} as const;
export type Level = (typeof LEVELS)[number];
export type Category = keyof typeof CATEGORIES;
export interface Config {
  level: Level;
  category: Category;
  mode: 'time' | 'words';
  timeSeconds: (typeof DURATIONS)[number];
  wordCount: (typeof WORD_COUNTS)[number];
  punctuation: boolean;
  numbers: boolean;
}
export interface Preferences extends Config { schemaVersion: 1; theme: 'dark' | 'light'; fontSize: number; boxHeight: number }
export const DEFAULTS: Preferences = {
  schemaVersion: 1, fontSize: 25, boxHeight: 288, mode: 'time', timeSeconds: 30, wordCount: 25,
  punctuation: false, numbers: false, theme: 'dark', level: 'normal', category: 'common',
};
export function validatePreferences(value: unknown): Preferences {
  if (!value || typeof value !== 'object' || !('schemaVersion' in value) || value.schemaVersion !== 1) return { ...DEFAULTS };
  const v = value as Record<string, unknown>;
  return {
    level: LEVELS.includes(v.level as Level) ? v.level as Level : DEFAULTS.level,
    category: typeof v.category === 'string' && Object.hasOwn(CATEGORIES, v.category) ? v.category as Category : DEFAULTS.category,
    fontSize: typeof v.fontSize === 'number' && Number.isFinite(v.fontSize) ? Math.min(40, Math.max(18, v.fontSize)) : DEFAULTS.fontSize,
    boxHeight: typeof v.boxHeight === 'number' && Number.isFinite(v.boxHeight) ? Math.min(480, Math.max(160, v.boxHeight)) : DEFAULTS.boxHeight,
    schemaVersion: 1,
    mode: v.mode === 'words' ? 'words' : DEFAULTS.mode,
    timeSeconds: DURATIONS.includes(v.timeSeconds as Config['timeSeconds']) ? v.timeSeconds as Config['timeSeconds'] : DEFAULTS.timeSeconds,
    wordCount: WORD_COUNTS.includes(v.wordCount as Config['wordCount']) ? v.wordCount as Config['wordCount'] : DEFAULTS.wordCount,
    punctuation: typeof v.punctuation === 'boolean' ? v.punctuation : DEFAULTS.punctuation,
    numbers: typeof v.numbers === 'boolean' ? v.numbers : DEFAULTS.numbers,
    theme: v.theme === 'light' ? 'light' : DEFAULTS.theme,
  };
}
export interface Breakdown { correct: number; incorrect: number; extra: number; missed: number; separators: number }
export interface Result extends Breakdown {
  scoringVersion: 1; config: Readonly<Config>; elapsedMs: number;
  successfulAttempts: number; totalAttempts: number; wpm: number; accuracy: number;
}
export type Status = 'ready' | 'running' | 'finished';
