import { describe, expect, it } from 'vitest';
import { HISTORY_KEY, parseCustomText, readHistory, saveHistory } from './history';
import type { HistoryEntry } from './history';
import { readPreferences, savePreferences } from './preferences';
import { DEFAULTS } from '@typechamp/typing-engine';

const entry: HistoryEntry = { id: '1', date: '2026-01-01T00:00:00.000Z', wpm: 42, accuracy: 98, label: 'common', comparison: 'same' };
describe('local progress', () => {
  it('round trips completed results, caps retention, and rejects corrupt entries', () => {
    const data = new Map<string, string>();
    const storage = () => ({ getItem: (key: string) => data.get(key) ?? null, setItem: (key: string, value: string) => { data.set(key, value); } });
    expect(saveHistory(Array.from({ length: 105 }, (_, i) => ({ ...entry, id: String(i) })), storage)).toBe(true);
    const saved = readHistory(storage).entries;
    expect(saved).toHaveLength(100); expect(saved[0]?.id).toBe('5');
    data.set(HISTORY_KEY, JSON.stringify([entry, { ...entry, accuracy: 101 }, null, { ...entry, date: 'invalid' }]));
    expect(readHistory(storage).entries).toEqual([entry]);
    data.set(HISTORY_KEY, '{bad'); expect(readHistory(storage).entries).toEqual([]);
  });
  it('handles blocked storage and persists reading controls', () => {
    const blocked = () => { throw new Error('blocked'); };
    expect(saveHistory([entry], blocked)).toBe(false);
    expect(readHistory(blocked).notice).toBeTruthy();
    let value = '';
    const storage = () => ({ getItem: () => value, setItem: (_: string, v: string) => { value = v; } });
    savePreferences({ ...DEFAULTS, fontSize: 32, boxHeight: 400 }, storage);
    expect(readPreferences(storage).preferences).toMatchObject({ fontSize: 32, boxHeight: 400 });
  });
});
describe('custom passages', () => {
  it('normalizes whitespace and typographic punctuation without losing words', () => {
    expect(parseCustomText('  “Hello,”\nworld! It’s\t2026…  ')).toEqual(['"Hello,"', 'world!', "It's", '2026...']);
  });
  it('rejects empty, oversized, and untypeable passages', () => {
    for (const text of [' \n ', 'a'.repeat(10001), 'hello 😀']) expect(() => parseCustomText(text)).toThrow();
  });
});
