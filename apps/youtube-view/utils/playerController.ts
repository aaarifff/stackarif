'use client';

/**
 * Playback repeat engine.
 *
 * Talks to plain YouTube iframes over the same postMessage protocol the
 * official IFrame API uses internally, so we can count playthroughs without
 * loading the API script into the page:
 *
 *   parent → widget: { event: 'listening' }
 *                    { event: 'command', func: 'addEventListener', args: ['onStateChange'] }
 *   widget → parent: { event: 'infoDelivery', info: { playerState, currentTime, … } }
 *
 * Player states: -1 unstarted, 0 ended, 1 playing, 2 paused, 3 buffering, 5 cued.
 */

export const PLAYER_STATE = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5,
} as const;

export type RepeatAction = 'ignore' | 'replay' | 'stop';

export interface PlaybackProgress {
  action: RepeatAction;
  /** Playthroughs completed after this state change. */
  completedPlays: number;
}

/**
 * Pure state machine deciding what happens when a player reports a state.
 * `repeatTimes` of 1 means "play once and stay stopped".
 */
export function nextPlaybackAction(
  state: number,
  completedPlays: number,
  repeatTimes: number,
): PlaybackProgress {
  if (state !== PLAYER_STATE.ENDED) {
    return { action: 'ignore', completedPlays };
  }

  const completed = completedPlays + 1;
  if (repeatTimes > 1 && completed < repeatTimes) {
    return { action: 'replay', completedPlays: completed };
  }
  // Target reached: the player stays paused instead of restarting.
  return { action: 'stop', completedPlays: completed };
}

const YT_ORIGIN = 'https://www.youtube.com';

type StateListener = (state: number) => void;

interface Binding {
  listener: StateListener;
  /** Last state delivered, so repeated updates are not double-counted. */
  lastState: number | null;
}

const bindings = new Map<Window, Binding>();
const retryTimers = new Map<Window, ReturnType<typeof setTimeout>[]>();
let installed = false;

function post(target: Window, message: Record<string, unknown>) {
  try {
    target.postMessage(JSON.stringify(message), YT_ORIGIN);
  } catch {
    // Cross-origin teardown — nothing to do.
  }
}

function handleMessage(event: MessageEvent) {
  if (event.origin !== YT_ORIGIN) return;
  const source = event.source as Window | null;
  if (!source) return;

  const binding = bindings.get(source);
  if (!binding) return;

  let data: unknown = event.data;
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch {
      return;
    }
  }
  if (!data || typeof data !== 'object') return;

  const { event: name, info } = data as {
    event?: string;
    info?: { playerState?: number };
  };

  if (
    (name === 'infoDelivery' || name === 'initialDelivery') &&
    typeof info?.playerState === 'number'
  ) {
    // The widget repeats the current state on every info update; only report
    // transitions so one playthrough can never be counted twice.
    if (binding.lastState === info.playerState) return;
    binding.lastState = info.playerState;
    binding.listener(info.playerState);
  }
}

function ensureListener() {
  if (installed || typeof window === 'undefined') return;
  installed = true;
  window.addEventListener('message', handleMessage);
}

/** Starts the widget's event stream and subscribes to state changes. */
function announce(target: Window) {
  post(target, { event: 'listening' });
  post(target, { event: 'command', func: 'addEventListener', args: ['onStateChange'] });
}

function clearRetries(target: Window) {
  const timers = retryTimers.get(target);
  if (timers) timers.forEach(clearTimeout);
  retryTimers.delete(target);
}

/**
 * Watches a player's state. Returns an unsubscribe function.
 * The widget can take a moment to accept messages, so the handshake is
 * retried a few times.
 */
export function watchPlayer(
  iframe: HTMLIFrameElement,
  listener: StateListener,
): () => void {
  const target = iframe.contentWindow;
  if (!target) return () => undefined;

  ensureListener();
  bindings.set(target, { listener, lastState: null });
  announce(target);

  retryTimers.set(
    target,
    [500, 1500, 3000].map((delay) =>
      setTimeout(() => {
        if (bindings.has(target)) announce(target);
      }, delay),
    ),
  );

  return () => {
    bindings.delete(target);
    clearRetries(target);
  };
}
