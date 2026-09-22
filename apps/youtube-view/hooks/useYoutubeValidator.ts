'use client';

import { useEffect, useRef, useState } from 'react';
import { parseYoutubeUrl } from '@/utils/youtubeParser';
import type { ValidationResult } from '@/types/youtube';

/**
 * Validates YouTube input locally (instant feedback) and then confirms it
 * against `/api/validate-url` to fetch the video title from oEmbed.
 */
export function useYoutubeValidator(input: string, debounceMs = 450) {
  const [result, setResult] = useState<ValidationResult>({
    status: 'empty',
    videoId: null,
  });
  const requestId = useRef(0);

  useEffect(() => {
    const trimmed = input.trim();
    if (!trimmed) {
      setResult({ status: 'empty', videoId: null });
      return;
    }

    const local = parseYoutubeUrl(trimmed);
    if (!local.valid || !local.videoId) {
      setResult({
        status: 'invalid',
        videoId: null,
        message: local.error ?? 'Invalid YouTube URL',
      });
      return;
    }

    const videoId = local.videoId;
    setResult({ status: 'checking', videoId });
    const id = ++requestId.current;

    const timer = setTimeout(async () => {
      try {
        const response = await fetch('/api/validate-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: trimmed }),
        });
        const data = (await response.json()) as {
          valid: boolean;
          videoId: string | null;
          title?: string | null;
        };
        if (id !== requestId.current) return;
        if (!data.valid) {
          setResult({
            status: 'invalid',
            videoId: null,
            message: 'Video is private or no longer available',
          });
          return;
        }
        setResult({
          status: 'valid',
          videoId: data.videoId ?? videoId,
          title: data.title ?? null,
        });
      } catch {
        if (id !== requestId.current) return;
        // Offline / network failure: keep the locally-validated result.
        setResult({
          status: 'valid',
          videoId,
          title: null,
          message: 'Network error. Please try again',
        });
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [input, debounceMs]);

  return result;
}
