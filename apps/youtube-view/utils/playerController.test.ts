import { describe, expect, it } from 'vitest';
import { PLAYER_STATE, nextPlaybackAction } from './playerController';

describe('nextPlaybackAction', () => {
  it('plays once and stops when the repeat time is 1', () => {
    expect(nextPlaybackAction(PLAYER_STATE.ENDED, 0, 1)).toEqual({
      action: 'stop',
      completedPlays: 1,
    });
  });

  it('replays a 3x video twice, then stops on the third playthrough', () => {
    let plays = 0;
    const actions: string[] = [];
    for (let i = 0; i < 3; i += 1) {
      const progress = nextPlaybackAction(PLAYER_STATE.ENDED, plays, 3);
      plays = progress.completedPlays;
      actions.push(progress.action);
    }
    expect(actions).toEqual(['replay', 'replay', 'stop']);
    expect(plays).toBe(3);
  });

  it('repeats 20 times when configured, stopping exactly once', () => {
    let plays = 0;
    let replays = 0;
    let stops = 0;
    for (let i = 0; i < 20; i += 1) {
      const progress = nextPlaybackAction(PLAYER_STATE.ENDED, plays, 20);
      plays = progress.completedPlays;
      if (progress.action === 'replay') replays += 1;
      if (progress.action === 'stop') stops += 1;
    }
    expect(replays).toBe(19);
    expect(stops).toBe(1);
    expect(plays).toBe(20);
  });

  it('ignores every non-ended player state', () => {
    const states = [
      PLAYER_STATE.UNSTARTED,
      PLAYER_STATE.PLAYING,
      PLAYER_STATE.PAUSED,
      PLAYER_STATE.BUFFERING,
      PLAYER_STATE.CUED,
    ];
    for (const state of states) {
      expect(nextPlaybackAction(state, 0, 5)).toEqual({
        action: 'ignore',
        completedPlays: 0,
      });
    }
  });

  it('stays stopped if a finished player ends again', () => {
    expect(nextPlaybackAction(PLAYER_STATE.ENDED, 3, 3)).toEqual({
      action: 'stop',
      completedPlays: 4,
    });
  });
});
