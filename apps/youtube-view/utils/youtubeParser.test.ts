import { describe, expect, it } from 'vitest';
import { parseYoutubeUrl, isValidYoutubeInput } from './youtubeParser';

const ID = 'dQw4w9WgXcQ';

describe('parseYoutubeUrl', () => {
  it('parses a standard watch URL', () => {
    expect(parseYoutubeUrl(`https://www.youtube.com/watch?v=${ID}`)).toEqual({
      valid: true,
      videoId: ID,
    });
  });

  it('parses a short youtu.be URL', () => {
    expect(parseYoutubeUrl(`https://youtu.be/${ID}`).videoId).toBe(ID);
  });

  it('parses watch URLs with extra params and timestamps', () => {
    const result = parseYoutubeUrl(`https://www.youtube.com/watch?v=${ID}&t=10s&list=abc`);
    expect(result.valid).toBe(true);
    expect(result.videoId).toBe(ID);
    expect(result.startSeconds).toBe(10);
  });

  it('parses embed and shorts URLs', () => {
    expect(parseYoutubeUrl(`https://www.youtube.com/embed/${ID}`).videoId).toBe(ID);
    expect(parseYoutubeUrl(`https://youtube.com/shorts/${ID}`).videoId).toBe(ID);
  });

  it('accepts a bare video id', () => {
    expect(parseYoutubeUrl(ID)).toEqual({ valid: true, videoId: ID });
  });

  it('accepts protocol-less URLs', () => {
    expect(parseYoutubeUrl(`youtube.com/watch?v=${ID}`).videoId).toBe(ID);
  });

  it('rejects empty input', () => {
    const result = parseYoutubeUrl('   ');
    expect(result.valid).toBe(false);
    expect(result.error).toBe('Please enter a YouTube URL');
  });

  it('rejects non-YouTube hosts', () => {
    const result = parseYoutubeUrl('https://vimeo.com/123456789');
    expect(result.valid).toBe(false);
    expect(result.error).toBe('Only YouTube links are supported');
  });

  it('rejects malformed video ids', () => {
    expect(isValidYoutubeInput('https://youtu.be/too-short')).toBe(false);
    expect(isValidYoutubeInput('https://www.youtube.com/watch?v=')).toBe(false);
  });

  it('rejects javascript: payloads (XSS guard)', () => {
    const result = parseYoutubeUrl('javascript:alert(1)//youtube.com/watch?v=abcdefghijk');
    expect(result.valid).toBe(false);
    expect(result.videoId).toBeNull();
  });
});
