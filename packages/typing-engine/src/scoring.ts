import type { Breakdown } from './types';
export function emptyBreakdown(): Breakdown { return { correct: 0, incorrect: 0, extra: 0, missed: 0, separators: 0 }; }
export function tokenScore(target: string, typed: string, submitted: boolean): Breakdown {
  const result = emptyBreakdown();
  for (let i = 0; i < typed.length; i++) {
    if (i >= target.length) result.extra++;
    else if (typed[i] === target[i]) result.correct++;
    else result.incorrect++;
  }
  if (submitted) result.missed = Math.max(0, target.length - typed.length);
  return result;
}
export function addScore(to: Breakdown, from: Breakdown): void {
  to.correct += from.correct; to.incorrect += from.incorrect; to.extra += from.extra;
  to.missed += from.missed; to.separators += from.separators;
}
