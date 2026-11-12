/// <reference types="bun" />
import { it, expect, describe } from 'bun:test';

import { HourPreferenceData, SessionCollectionItemDto, SportPreferenceResponseData } from '@/api/generated/model';

import { getTimePeriod, getMatchReasons } from './home-match-reasons.utils';

// Local dates, so that the tests do not depend on the machine's time zone
const SATURDAY_3PM = new Date(2026, 9, 3, 15, 0).toISOString();
const SATURDAY_10AM = new Date(2026, 9, 3, 10, 0).toISOString();

const football: SportPreferenceResponseData = { gameModes: [], level: 2, sport: 'FOOTBALL', uid: '1' };
const saturdayAfternoon: HourPreferenceData = { dayOfWeek: 6, timePeriod: 'AFTERNOON', type: 'RECURRENT' };

const session = (
  values: Partial<Pick<SessionCollectionItemDto, 'level' | 'sport' | 'startDate' | 'userDistance'>>,
): Pick<SessionCollectionItemDto, 'level' | 'sport' | 'startDate' | 'userDistance'> => ({
  level: 2 as unknown as SessionCollectionItemDto['level'],
  sport: 'FOOTBALL',
  startDate: SATURDAY_3PM,
  userDistance: 1.4,
  ...values,
});

describe('getTimePeriod', () => {
  it('should split the day in three moments', () => {
    expect(getTimePeriod(new Date(2026, 9, 3, 11, 59))).toBe('MORNING');
    expect(getTimePeriod(new Date(2026, 9, 3, 12, 0))).toBe('AFTERNOON');
    expect(getTimePeriod(new Date(2026, 9, 3, 17, 0))).toBe('EVENING');
  });
});

describe('getMatchReasons', () => {
  it('should give the level, the slot and the distance', () => {
    expect(
      getMatchReasons({ availabilities: [saturdayAfternoon], session: session({}), sportPreferences: [football] }),
    ).toEqual([
      { type: 'level' },
      { startDate: SATURDAY_3PM, timePeriod: 'AFTERNOON', type: 'slot' },
      { distance: 1.4, type: 'distance' },
    ]);
  });

  it('should take a session open to all levels as the player level', () => {
    const reasons = getMatchReasons({
      availabilities: [],
      session: session({ level: 0 as unknown as SessionCollectionItemDto['level'], userDistance: 0 }),
      sportPreferences: [football],
    });
    expect(reasons).toEqual([{ type: 'level' }]);
  });

  it('should skip the level one level apart, or for another sport', () => {
    expect(
      getMatchReasons({
        availabilities: [],
        session: session({ level: 3 as unknown as SessionCollectionItemDto['level'], userDistance: 0 }),
        sportPreferences: [football],
      }),
    ).toEqual([]);
    expect(
      getMatchReasons({
        availabilities: [],
        session: session({ sport: 'BASKETBALL', userDistance: 0 }),
        sportPreferences: [football],
      }),
    ).toEqual([]);
  });

  it('should skip the slot out of the availabilities', () => {
    const reasons = getMatchReasons({
      availabilities: [saturdayAfternoon],
      session: session({ startDate: SATURDAY_10AM, userDistance: 0 }),
      sportPreferences: [],
    });
    expect(reasons).toEqual([]);
  });

  it('should match a one-time availability on the same day', () => {
    const reasons = getMatchReasons({
      availabilities: [{ date: SATURDAY_10AM, dayOfWeek: 6, timePeriod: 'AFTERNOON', type: 'ONE_TIME' }],
      session: session({ userDistance: 0 }),
      sportPreferences: [],
    });
    expect(reasons).toEqual([{ startDate: SATURDAY_3PM, timePeriod: 'AFTERNOON', type: 'slot' }]);
  });

  it('should round the distance to one decimal', () => {
    const reasons = getMatchReasons({ availabilities: [], session: session({ userDistance: 2.26 }), sportPreferences: [] });
    expect(reasons).toEqual([{ distance: 2.3, type: 'distance' }]);
  });
});
