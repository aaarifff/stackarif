import type { Result } from '@typechamp/typing-engine';
import type { StorageAccess } from './preferences';

export const HISTORY_KEY = 'typechamp.history.v1';
export const HISTORY_NOTICE = 'Progress cannot be saved on this device. Results will last for this visit.';
export interface HistoryEntry {
  id: string; date: string; wpm: number; accuracy: number; label: string; comparison: string;
}
export function readHistory(getStorage: () => StorageAccess): { entries: HistoryEntry[]; notice: string } {
  try {
    const raw = getStorage().getItem(HISTORY_KEY);
    if (!raw) return { entries: [], notice: '' };
    const values: unknown = JSON.parse(raw);
    if (!Array.isArray(values)) return { entries: [], notice: '' };
    return { entries: values.filter((v): v is HistoryEntry => v && typeof v.id === 'string' &&
      typeof v.date === 'string' && Number.isFinite(Date.parse(v.date)) &&
      typeof v.wpm === 'number' && Number.isFinite(v.wpm) && v.wpm >= 0 &&
      typeof v.accuracy === 'number' && Number.isFinite(v.accuracy) && v.accuracy >= 0 && v.accuracy <= 100 &&
      typeof v.label === 'string' && typeof v.comparison === 'string').slice(-100), notice: '' };
  } catch { return { entries: [], notice: HISTORY_NOTICE }; }
}
export function saveHistory(entries: HistoryEntry[], getStorage: () => StorageAccess): boolean {
  try { getStorage().setItem(HISTORY_KEY, JSON.stringify(entries.slice(-100))); return true; }
  catch { return false; }
}
export function historyEntry(result: Result, source: string, wordCount: number): HistoryEntry {
  const c = result.config;
  const label = source === 'category' ? `${c.category} · ${c.level} · ${c.mode === 'time' ? `${c.timeSeconds}s` : `${wordCount} words`}` : `${source} · ${wordCount} words`;
  return { id: crypto.randomUUID(), date: new Date().toISOString(), wpm: result.wpm, accuracy: result.accuracy,
    label, comparison: source === 'category' ? JSON.stringify([c.category, c.level, c.mode, c.mode === 'time' ? c.timeSeconds : wordCount, c.punctuation, c.numbers]) : '' };
}
export function parseCustomText(text: string): string[] {
  const normalized = text.replace(/[\u2018\u2019]/g, "'").replace(/[\u201c\u201d]/g, '"').replace(/[\u2013\u2014]/g, '-').replace(/\u2026/g, '...').trim().replace(/\s+/g, ' ');
  if (!normalized) throw new Error('Paste some text to start practicing.');
  if (normalized.length > 10000) throw new Error('Please use 10,000 characters or fewer.');
  if (!/^[\x20-\x7e]+$/.test(normalized)) throw new Error('Use English letters, numbers, and standard punctuation. Curly quotes and dashes are converted automatically.');
  return normalized.split(' ');
}
