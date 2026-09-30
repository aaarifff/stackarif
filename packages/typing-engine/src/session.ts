import { generate, seededRandom } from './content';
import { addScore, emptyBreakdown, tokenScore } from './scoring';
import { validatePreferences } from './types';
import type { Config, Result, Status } from './types';

/** All timestamps are supplied by the caller using one monotonic clock. */
export class Session {
  readonly config: Readonly<Config>;
  readonly tokens: string[];
  readonly passageIndex: number;
  readonly mistakes = new Set<string>();
  readonly typed = new Map<number, string>();
  readonly submitted = new Set<number>();
  readonly random: () => number;
  status: Status = 'ready';
  activeIndex = 0;
  lockedThroughIndex = -1;
  startedAt: number | null = null;
  deadline: number | null = null;
  finishedAt: number | null = null;
  successfulAttempts = 0;
  totalAttempts = 0;
  private lockedScore = emptyBreakdown();

  constructor(config: Config, seed: number, tokens?: string[], passageIndex = seed % 3) {
    const valid = validatePreferences({ ...config, schemaVersion: 1 });
    this.config = Object.freeze({ mode: valid.mode, timeSeconds: valid.timeSeconds, wordCount: valid.wordCount, punctuation: valid.punctuation, numbers: valid.numbers, level: valid.level, category: valid.category });
    this.random = seededRandom(seed);
    this.passageIndex = passageIndex;
    if (tokens && (!tokens.length || tokens.some(token => !/^[\x21-\x7e]+$/.test(token)))) throw new Error('Practice text must contain printable English characters.');
    this.tokens = tokens ? [...tokens] : generate(this.config, this.config.mode === 'time' ? 100 : this.config.wordCount, this.random, '', 0, this.passageIndex);
  }
  get text(): string { return this.typed.get(this.activeIndex) ?? ''; }
  private get expected(): string { return this.tokens[this.activeIndex] ?? ''; }
  tick(now: number): boolean {
    if (this.status === 'running' && this.deadline !== null && now >= this.deadline) {
      this.finish(this.deadline); return true;
    }
    return false;
  }
  insert(char: string, now: number): boolean {
    this.tick(now);
    if (this.status === 'finished' || !/^[\x21-\x7e]$/.test(char)) return false;
    if (this.status === 'ready') {
      this.status = 'running'; this.startedAt = now;
      if (this.config.mode === 'time') this.deadline = now + this.config.timeSeconds * 1000;
    }
    const text = this.text;
    this.totalAttempts++;
    if (this.expected[text.length] === char) this.successfulAttempts++;
    else this.mistakes.add(this.expected);
    this.typed.set(this.activeIndex, text + char);
    this.checkFinal(now);
    return true;
  }
  submit(now: number): boolean {
    this.tick(now);
    if (this.status !== 'running' || !this.text) return false;
    this.submitted.add(this.activeIndex);
    if (this.text !== this.expected) this.mistakes.add(this.expected);
    if (this.config.mode === 'words' && this.activeIndex === this.tokens.length - 1) { this.finish(now); return true; }
    this.totalAttempts++; this.successfulAttempts++;
    this.activeIndex++;
    if (this.config.mode === 'time' && this.tokens.length - this.activeIndex < 30) {
      this.tokens.push(...generate(this.config, 100, this.random, this.tokens.at(-1), this.tokens.length, this.passageIndex));
    }
    return true;
  }
  backspace(now: number): boolean {
    this.tick(now);
    if (this.status !== 'running') return false;
    if (this.text) {
      this.typed.set(this.activeIndex, this.text.slice(0, -1));
      this.checkFinal(now); return true;
    }
    if (this.activeIndex - 1 <= this.lockedThroughIndex) return false;
    this.activeIndex--; this.submitted.delete(this.activeIndex); return true;
  }
  lockThrough(index: number): void {
    const boundary = Math.min(Math.floor(index), this.activeIndex - 1);
    for (let i = this.lockedThroughIndex + 1; i <= boundary; i++) {
      const score = tokenScore(this.tokens[i] ?? '', this.typed.get(i) ?? '', true);
      score.separators = 1;
      addScore(this.lockedScore, score);
      this.typed.delete(i); this.submitted.delete(i);
    }
    this.lockedThroughIndex = Math.max(this.lockedThroughIndex, boundary);
  }
  private checkFinal(now: number): void {
    if (this.config.mode === 'words' && this.activeIndex === this.tokens.length - 1 && this.text === this.tokens[this.activeIndex]) {
      this.submitted.add(this.activeIndex); this.finish(now);
    }
  }
  private finish(now: number): void { this.status = 'finished'; this.finishedAt = now; }
  result(now: number): Result {
    const breakdown = { ...this.lockedScore };
    for (let i = this.lockedThroughIndex + 1; i <= this.activeIndex; i++) {
      const submitted = this.submitted.has(i);
      const score = tokenScore(this.tokens[i] ?? '', this.typed.get(i) ?? '', submitted);
      if (submitted && (this.config.mode === 'time' || i < this.tokens.length - 1)) score.separators = 1;
      addScore(breakdown, score);
    }
    const elapsedMs = this.startedAt === null ? 0 : Math.max(0, (this.finishedAt ?? Math.min(now, this.deadline ?? now)) - this.startedAt);
    return { ...breakdown, scoringVersion: 1, config: this.config, elapsedMs,
      successfulAttempts: this.successfulAttempts, totalAttempts: this.totalAttempts,
      wpm: elapsedMs ? ((breakdown.correct + breakdown.separators) / 5) / (elapsedMs / 60000) : 0,
      accuracy: this.totalAttempts ? 100 * this.successfulAttempts / this.totalAttempts : 0,
    };
  }
}
