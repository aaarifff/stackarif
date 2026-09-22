import { describe, expect, it } from 'vitest';
import { buildEmbedUrl, generateEmbeds, isAllowedEmbedCount } from './embedGenerator';

const ID = 'dQw4w9WgXcQ';

describe('buildEmbedUrl', () => {
  it('always mutes and enables controls', () => {
    const url = new URL(buildEmbedUrl(ID));
    expect(url.pathname).toBe(`/embed/${ID}`);
    expect(url.searchParams.get('mute')).toBe('1');
    expect(url.searchParams.get('controls')).toBe('1');
    expect(url.searchParams.get('fs')).toBe('1');
    expect(url.searchParams.get('rel')).toBe('0');
  });

  it('omits autoplay unless requested', () => {
    expect(new URL(buildEmbedUrl(ID)).searchParams.get('autoplay')).toBeNull();
    expect(
      new URL(buildEmbedUrl(ID, { autoplay: true })).searchParams.get('autoplay'),
    ).toBe('1');
  });

  it('applies a start timestamp only when positive', () => {
    expect(new URL(buildEmbedUrl(ID, { startSeconds: 30 })).searchParams.get('start')).toBe('30');
    expect(new URL(buildEmbedUrl(ID, { startSeconds: 0 })).searchParams.get('start')).toBeNull();
  });

  it('enables the js api so batch controls work', () => {
    expect(new URL(buildEmbedUrl(ID)).searchParams.get('enablejsapi')).toBe('1');
  });

  it('scopes the postMessage channel to the page origin when provided', () => {
    const url = new URL(buildEmbedUrl(ID, { origin: 'https://example.com' }));
    expect(url.searchParams.get('origin')).toBe('https://example.com');
    expect(new URL(buildEmbedUrl(ID)).searchParams.get('origin')).toBeNull();
  });
});

describe('generateEmbeds', () => {
  it('creates sequentially numbered embeds', () => {
    const embeds = generateEmbeds(ID, 20, { autoplay: true });
    expect(embeds).toHaveLength(20);
    expect(embeds[0]).toMatchObject({ id: 'embed_1', position: 1, status: 'loading' });
    expect(embeds[19]).toMatchObject({ id: 'embed_20', position: 20 });
    expect(embeds[0].iframeUrl).toContain('autoplay=1');
    expect(embeds[0].iframeUrl).toContain('mute=1');
  });
});

describe('isAllowedEmbedCount', () => {
  it('accepts the offered embed quantities', () => {
    for (const count of [20, 30, 50, 100]) {
      expect(isAllowedEmbedCount(count)).toBe(true);
    }
  });

  it('rejects quantities outside the offered set', () => {
    for (const count of [0, 3, 10, 15, 25, 101, '20', undefined]) {
      expect(isAllowedEmbedCount(count)).toBe(false);
    }
  });
});
