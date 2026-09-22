'use client';

const YT_ORIGIN = 'https://www.youtube.com';

/**
 * Drives YouTube iframes through the postMessage command API.
 * Requires `enablejsapi=1` on the embed URL (embedGenerator sets it).
 */
export type PlayerCommand =
  | 'playVideo'
  | 'pauseVideo'
  | 'mute'
  | 'unMute'
  | 'stopVideo'
  | 'seekTo';

export function commandIframe(
  iframe: HTMLIFrameElement | null | undefined,
  func: PlayerCommand,
  args: unknown[] = [],
) {
  if (!iframe?.contentWindow) return;
  iframe.contentWindow.postMessage(
    JSON.stringify({ event: 'command', func, args }),
    YT_ORIGIN,
  );
}

/** Replays a finished player from the start. */
export function replayIframe(iframe: HTMLIFrameElement | null | undefined) {
  commandIframe(iframe, 'seekTo', [0, true]);
  commandIframe(iframe, 'playVideo');
}

export function commandAll(
  registry: Map<string, HTMLIFrameElement>,
  func: PlayerCommand,
) {
  registry.forEach((iframe) => commandIframe(iframe, func));
}
