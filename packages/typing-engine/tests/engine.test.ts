import { describe, expect, it } from 'vitest';
import { CATEGORIES, LEVELS, DEFAULTS, DURATIONS, WORD_COUNTS, Session, generate, seededRandom, validatePreferences, WORDS } from '../src';

describe('configuration and content', () => {
  it('validates every field independently and rejects unknown schemas', () => {
    expect(validatePreferences(null)).toEqual(DEFAULTS);
    expect(validatePreferences({ ...DEFAULTS, schemaVersion: 2, theme: 'light' })).toEqual(DEFAULTS);
    expect(validatePreferences({ ...DEFAULTS, timeSeconds: -1, wordCount: '50', numbers: 'true', theme: 'light' })).toEqual({ ...DEFAULTS, theme: 'light' });
    for (const timeSeconds of DURATIONS) for (const wordCount of WORD_COUNTS) {
      const config = { ...DEFAULTS, timeSeconds, wordCount, mode: 'words' as const, numbers: true, punctuation: true };
      expect(validatePreferences(config)).toEqual(config);
    }
  });
  it('has 200+ distinct lowercase words and deterministic finite content', () => {
    expect(new Set(WORDS).size).toBeGreaterThanOrEqual(200);
    expect(WORDS.every(w => /^[a-z]+$/.test(w))).toBe(true);
    for (const wordCount of WORD_COUNTS) {
      const s = new Session({ ...DEFAULTS, mode: 'words', wordCount }, 12);
      expect(s.tokens).toHaveLength(wordCount);
      expect(s.tokens.every(w => /^[a-z]+$/.test(w))).toBe(true);
      expect(s.tokens).toEqual(new Session({ ...DEFAULTS, mode: 'words', wordCount }, 12).tokens);
    }
  });
  it('guarantees each enabled modifier and all punctuation forms across seeds', () => {
    const all: string[] = [];
    for (let seed = 0; seed < 100; seed++) for (const count of WORD_COUNTS) {
      const tokens = generate({ ...DEFAULTS, numbers: true, punctuation: true }, count, seededRandom(seed));
      expect(tokens).toHaveLength(count);
      expect(tokens.some(t => /^\d+$/.test(t))).toBe(true);
      expect(tokens.some(t => /[A-Z,."]/.test(t))).toBe(true);
      expect(tokens.filter(t => /\d/.test(t)).every(t => /^\d+$/.test(t) && Number(t) <= 9999)).toBe(true);
      all.push(...tokens);
    }
    for (const re of [/^[A-Z]/, /,$/, /\.$/, /^"[a-z]+"$/]) expect(all.some(t => re.test(t))).toBe(true);
    const s = new Session({ ...DEFAULTS, numbers: true, punctuation: true }, 42);
    expect(s.tokens).toHaveLength(100);
    expect(s.tokens.some(t => /^\d+$/.test(t))).toBe(true);
    const initial = [...s.tokens];
    for (let i = 0; i < 75; i++) { s.insert('a', i); s.submit(i); }
    expect(s.tokens).toHaveLength(200);
    expect(s.tokens.slice(0, 100)).toEqual(initial);
  });
});

describe('practice categories and levels', () => {
  it('migrates older preferences and rejects invalid content settings', () => {
    const legacy: Partial<typeof DEFAULTS> = { ...DEFAULTS };
    delete legacy.level; delete legacy.category;
    expect(validatePreferences(legacy)).toEqual(DEFAULTS);
    expect(validatePreferences({ ...DEFAULTS, level: 'expert', category: '__proto__' })).toEqual(DEFAULTS);
  });
  it('offers distinct, typeable content at every category and level', () => {
    const passages = new Set<string>();
    for (const category of Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>) {
      for (const level of LEVELS) for (const punctuation of [false, true]) {
        const config = { ...DEFAULTS, category, level, punctuation, mode: 'words' as const, wordCount: 25 as const };
        const s = new Session(config, 42);
        expect(s.config).toMatchObject({ category, level });
        expect(s.tokens).toHaveLength(25);
        expect(s.tokens.every(word => punctuation ? /^[\x21-\x7e]+$/.test(word) : /^[a-z]+$/.test(word))).toBe(true);
        if (!punctuation) passages.add(s.tokens.join(' '));
        let now = 0;
        for (const word of s.tokens) {
          for (const char of word) s.insert(char, now++);
          s.submit(now++);
        }
        expect(s.status).toBe('finished');
        expect(s.result(now).accuracy).toBe(100);
      }
    }
    expect(passages.size).toBe(Object.keys(CATEGORIES).length * LEVELS.length);
  });
  it('continues category passages across timed content batches', () => {
    const config = { ...DEFAULTS, category: 'history' as const, level: 'medium' as const };
    const s = new Session(config, 42);
    const expected = generate(config, 200, seededRandom(42));
    for (let i = 0; i < 75; i++) { s.insert('a', i); s.submit(i); }
    expect(s.tokens).toEqual(expected);
  });
});

describe('session lifecycle and scoring', () => {
  const words = () => new Session({ ...DEFAULTS, mode: 'words' }, 1, ['cat', 'dog']);
  it('only accepted characters start; finished sessions reject edits', () => {
    const s = words();
    for (const value of ['', ' ', '\n', 'Enter', 'é', 'paste', '😀']) expect(s.insert(value, 0)).toBe(false);
    s.backspace(0); s.submit(0);
    expect(s.status).toBe('ready');
    s.insert('X', 10); expect(s.status).toBe('running'); expect(s.startedAt).toBe(10);
    s.submit(20); s.insert('z', 30); s.submit(40);
    const result = s.result(40);
    s.insert('x', 50); s.backspace(50); s.submit(50);
    expect(s.result(100)).toEqual(result);
  });
  it('matches the published scoring fixture', () => {
    const s = words();
    for (const c of 'caxz') s.insert(c, 0);
    s.submit(100); for (const c of 'do') s.insert(c, 200);
    s.submit(30000);
    expect(s.result(40000)).toMatchObject({ correct: 4, incorrect: 1, extra: 1, missed: 1, separators: 1, successfulAttempts: 5, totalAttempts: 7, wpm: 2, elapsedMs: 30000, scoringVersion: 1 });
    expect(s.result(0).accuracy).toBeCloseTo(71.42857);
  });
  it('does not erase attempt history on correction or double count resubmission', () => {
    const s = words();
    s.insert('x', 0); s.backspace(1); s.insert('c', 2); s.submit(3);
    expect(s.result(3)).toMatchObject({ correct: 1, missed: 2, separators: 1, totalAttempts: 3, successfulAttempts: 2 });
    s.submit(4); expect(s.totalAttempts).toBe(3);
    s.backspace(5);
    expect(s.activeIndex).toBe(0);
    expect(s.text).toBe('c');
    expect(s.result(5)).toMatchObject({ missed: 0, separators: 0 });
    s.insert('a', 6); s.insert('t', 7); s.submit(8);
    expect(s.result(8)).toMatchObject({ correct: 3, missed: 0, separators: 1, totalAttempts: 6, successfulAttempts: 5 });
    s.lockThrough(0); s.lockThrough(-1); s.backspace(9);
    expect(s.activeIndex).toBe(1); expect(s.lockedThroughIndex).toBe(0);
    expect(s.result(9).correct).toBe(3);
  });
  it.each(DURATIONS)('enforces the %i-second absolute deadline on all input operations', duration => {
    for (const action of ['insert', 'backspace', 'submit', 'tick'] as const) {
      const s = new Session({ ...DEFAULTS, timeSeconds: duration }, 1, ['cat', 'dog']);
      s.insert('c', 100); s.insert('a', 110);
      const deadline = 100 + duration * 1000;
      if (action === 'insert') s.insert('t', deadline); else s[action](deadline + (action === 'tick' ? 10000 : 0));
      expect(s.status).toBe('finished');
      expect(s.result(deadline + 20000)).toMatchObject({ correct: 2, missed: 0, elapsedMs: duration * 1000, totalAttempts: 2 });
    }
  });
  it.each(WORD_COUNTS)('finishes a %i-token test on the exact last match', wordCount => {
    const s = new Session({ ...DEFAULTS, mode: 'words', wordCount }, 30);
    let now = 1;
    for (const word of s.tokens) { for (const c of word) s.insert(c, now++); s.submit(now++); }
    expect(s.status).toBe('finished');
    expect(s.result(now).separators).toBe(wordCount - 1);
    expect(s.result(now).accuracy).toBe(100);
  });
  it('finishes when deletion creates the exact last match and counts final short submissions', () => {
    const s = words(); s.insert('c', 0); s.submit(1);
    // An incorrect prefix permits overtyping without matching the complete word.
    s.insert('x', 2); s.insert('o', 3); s.insert('g', 4); s.insert('z', 5);
    expect(s.status).toBe('running');
    // Inject an overtyped buffer to exercise the specified deletion boundary directly.
    s.typed.set(1, 'dogz'); s.backspace(10);
    expect(s.status).toBe('finished'); expect(s.finishedAt).toBe(10);
    const t = words(); t.insert('c', 0); t.submit(1); t.insert('d', 2); t.submit(30);
    expect(t.result(30)).toMatchObject({ missed: 4, separators: 1, totalAttempts: 3, successfulAttempts: 3 });
  });
  it('handles zero elapsed time, no attempts, and partial timeout', () => {
    const s = new Session(DEFAULTS, 1, ['cat']);
    expect(s.result(100)).toMatchObject({ wpm: 0, accuracy: 0, elapsedMs: 0 });
    s.insert('c', 0); expect(s.result(0).wpm).toBe(0);
    s.tick(50000); expect(s.result(50000)).toMatchObject({ correct: 1, missed: 0, elapsedMs: 30000 });
  });
});

describe('expanded practice', () => {
  it('provides three different passages per category and level and maintains timed continuity', () => {
    for (const category of Object.keys(CATEGORIES).filter(c => c !== 'common') as Array<Exclude<keyof typeof CATEGORIES, 'common'>>) {
      for (const level of LEVELS) {
        const variations = new Set<string>();
        for (let variant = 0; variant < 3; variant++) {
          const config = { ...DEFAULTS, category, level };
          const s = new Session(config, 42, undefined, variant);
          variations.add(s.tokens.slice(0, 10).join(' '));
          for (let i = 0; i < 75; i++) { s.insert('a', i); s.submit(i); }
          expect(s.tokens).toEqual(generate(config, 200, seededRandom(42), '', 0, variant));
          expect(s.tokens.every(t => /^[a-z]+$/.test(t))).toBe(true);
        }
        expect(variations.size).toBe(3);
      }
    }
  });
  it('remembers corrected mistakes and skipped endings after scrolling locks', () => {
    const s = new Session({ ...DEFAULTS, mode: 'words' }, 0, ['cat', 'dog', 'end']);
    s.insert('x', 1); s.backspace(2);
    for (const c of 'cat') s.insert(c, 3);
    s.submit(4); s.insert('d', 5); s.submit(6); s.lockThrough(1);
    for (const c of 'end') s.insert(c, 7);
    expect(s.status).toBe('finished');
    expect([...s.mistakes]).toEqual(['cat', 'dog']);
    const retry = new Session({ ...DEFAULTS, mode: 'words' }, 0, [...s.mistakes]);
    for (const word of retry.tokens) { for (const c of word) retry.insert(c, 10); retry.submit(11); }
    expect(retry.status).toBe('finished'); expect(retry.mistakes.size).toBe(0);
  });
  it('rejects invalid custom tokens and migrates missing reading preferences', () => {
    expect(() => new Session(DEFAULTS, 0, [])).toThrow();
    expect(() => new Session(DEFAULTS, 0, ['😀'])).toThrow();
    expect(validatePreferences({ schemaVersion: 1, fontSize: 100, boxHeight: -1 })).toMatchObject({ fontSize: 40, boxHeight: 160 });
    expect(validatePreferences({ schemaVersion: 1 })).toEqual(DEFAULTS);
  });
});
