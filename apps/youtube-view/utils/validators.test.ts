import { describe, expect, it } from 'vitest';
import {
  isValidLayoutMode,
  normalizeEmbedCount,
  normalizeRepeatTime,
  sanitizeOrigin,
  sanitizeText,
  sanitizeVideoId,
} from './validators';

describe('sanitizeVideoId', () => {
  it('accepts an 11-char id and trims whitespace', () => {
    expect(sanitizeVideoId('  dQw4w9WgXcQ ')).toBe('dQw4w9WgXcQ');
  });

  it('rejects markup and wrong lengths', () => {
    expect(sanitizeVideoId('<script>alert(1)</script>')).toBeNull();
    expect(sanitizeVideoId('short')).toBeNull();
    expect(sanitizeVideoId(42)).toBeNull();
  });
});

describe('normalizeEmbedCount', () => {
  it('passes through allowed counts only', () => {
    expect(normalizeEmbedCount(50)).toBe(50);
    expect(normalizeEmbedCount('100')).toBe(100);
    expect(normalizeEmbedCount(15)).toBeNull();
    expect(normalizeEmbedCount(1000)).toBeNull();
  });
});

describe('normalizeRepeatTime', () => {
  it('accepts the offered repeat times', () => {
    for (const time of [1, 3, 5, 10, 20]) {
      expect(normalizeRepeatTime(time)).toBe(time);
    }
    expect(normalizeRepeatTime('5')).toBe(5);
  });

  it('rejects anything outside the offered set', () => {
    for (const time of [0, 2, 4, 21, 100, '', null, undefined, 'abc']) {
      expect(normalizeRepeatTime(time)).toBeNull();
    }
  });
});

describe('sanitizeOrigin', () => {
  it('accepts bare http(s) origins', () => {
    expect(sanitizeOrigin('https://example.com')).toBe('https://example.com');
    expect(sanitizeOrigin('http://localhost:3000')).toBe('http://localhost:3000');
  });

  it('normalizes paths down to the origin', () => {
    expect(sanitizeOrigin('https://example.com/watch?v=1')).toBe('https://example.com');
  });

  it('rejects junk protocols, non-URLs and oversized input', () => {
    expect(sanitizeOrigin('javascript:alert(1)')).toBeUndefined();
    expect(sanitizeOrigin('not-a-url')).toBeUndefined();
    expect(sanitizeOrigin(undefined)).toBeUndefined();
    expect(sanitizeOrigin(`https://example.com/${'a'.repeat(300)}`)).toBeUndefined();
  });
});

describe('isValidLayoutMode', () => {
  it('whitelists layout modes', () => {
    expect(isValidLayoutMode('grid_4x4')).toBe(true);
    expect(isValidLayoutMode('list')).toBe(true);
    expect(isValidLayoutMode('grid_99x99')).toBe(false);
  });
});

describe('sanitizeText', () => {
  it('strips markup and control characters', () => {
    expect(sanitizeText('<b>hi</b>\n')).toBe('bhi/b');
    expect(sanitizeText(null)).toBe('');
  });

  it('caps length', () => {
    expect(sanitizeText('a'.repeat(50), 10)).toHaveLength(10);
  });
});
