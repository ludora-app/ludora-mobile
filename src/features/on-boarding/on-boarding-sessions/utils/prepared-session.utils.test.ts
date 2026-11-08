/// <reference types="bun" />
import { it, expect, describe } from 'bun:test';

import { HourPreferenceData, SportPreferenceResponseData } from '@/api/generated/model';

import {
  getPreparedSession,
  getSessionDayStartTimes,
  getPreparedSessionSport,
  getPreparedSessionStartDate,
} from './prepared-session.utils';

// Local dates, so that the tests do not depend on the machine's time zone
const MONDAY_9AM = new Date(2026, 10, 2, 9, 0);
const FRIDAY_NOON = new Date(2026, 10, 6, 12, 0);

const football: SportPreferenceResponseData = { gameModes: ['SEVEN_V_SEVEN'], level: 2, sport: 'FOOTBALL', uid: '1' };
const basketball: SportPreferenceResponseData = { gameModes: [], level: 3, sport: 'BASKETBALL', uid: '2' };

const recurrent = (dayOfWeek: number, timePeriod: HourPreferenceData['timePeriod']): HourPreferenceData => ({
  dayOfWeek,
  timePeriod,
  type: 'RECURRENT',
});

describe('getPreparedSessionSport', () => {
  it('should take the sport with the highest level', () => {
    expect(getPreparedSessionSport([football, basketball])).toEqual({
      gameMode: 'FIVE_V_FIVE',
      level: 3,
      sport: 'BASKETBALL',
    });
  });

  it('should take the first sport chosen on a tie', () => {
    expect(getPreparedSessionSport([football, { ...basketball, level: 2 }])?.sport).toBe('FOOTBALL');
  });

  it("should keep the player's first format", () => {
    expect(getPreparedSessionSport([football])?.gameMode).toBe('SEVEN_V_SEVEN');
  });

  it("should use the sport's default format without format", () => {
    expect(getPreparedSessionSport([{ ...football, gameModes: [], sport: 'PADEL' }])?.gameMode).toBe('TWO_V_TWO');
  });

  it('should return null without sport', () => {
    expect(getPreparedSessionSport([])).toBeNull();
  });
});

describe('getPreparedSessionStartDate', () => {
  it('should prefer a weekend slot within the next 7 days', () => {
    const availabilities = [recurrent(3, 'EVENING'), recurrent(6, 'MORNING')];

    expect(getPreparedSessionStartDate({ availabilities, now: MONDAY_9AM })).toEqual(new Date(2026, 10, 7, 10, 0));
  });

  it('should take the earliest slot without weekend slot', () => {
    const availabilities = [recurrent(3, 'EVENING'), recurrent(4, 'AFTERNOON')];

    expect(getPreparedSessionStartDate({ availabilities, now: MONDAY_9AM })).toEqual(new Date(2026, 10, 4, 19, 30));
  });

  it('should start at least 48 hours from now', () => {
    const availabilities = [recurrent(6, 'MORNING')];

    expect(getPreparedSessionStartDate({ availabilities, now: FRIDAY_NOON })).toEqual(new Date(2026, 10, 14, 10, 0));
  });

  it('should match a one-time availability on its date', () => {
    const availabilities: HourPreferenceData[] = [
      { date: new Date(2026, 10, 5).toISOString(), dayOfWeek: 4, timePeriod: 'AFTERNOON', type: 'ONE_TIME' },
    ];

    expect(getPreparedSessionStartDate({ availabilities, now: MONDAY_9AM })).toEqual(new Date(2026, 10, 5, 15, 0));
  });

  it('should take the first Saturday morning 48 hours away without availability', () => {
    expect(getPreparedSessionStartDate({ availabilities: [], now: MONDAY_9AM })).toEqual(new Date(2026, 10, 7, 10, 0));
    expect(getPreparedSessionStartDate({ availabilities: [], now: FRIDAY_NOON })).toEqual(
      new Date(2026, 10, 14, 10, 0),
    );
  });
});

describe('getPreparedSession', () => {
  it('should end after the duration of the sport and format', () => {
    const session = getPreparedSession({
      availabilities: [recurrent(6, 'MORNING')],
      now: MONDAY_9AM,
      sportPreferences: [{ ...football, gameModes: ['ELEVEN_V_ELEVEN'] }],
    });

    expect(session?.startDate).toEqual(new Date(2026, 10, 7, 10, 0));
    expect(session?.endDate).toEqual(new Date(2026, 10, 7, 12, 0));
    expect(session?.isWithoutAvailabilities).toBe(false);
  });

  it('should last 1 h 30 by default and flag the missing availabilities', () => {
    const session = getPreparedSession({ availabilities: [], now: MONDAY_9AM, sportPreferences: [basketball] });

    expect(session?.endDate).toEqual(new Date(2026, 10, 7, 11, 30));
    expect(session?.isWithoutAvailabilities).toBe(true);
  });

  it('should prepare no session without sport', () => {
    expect(getPreparedSession({ availabilities: [], now: MONDAY_9AM, sportPreferences: [] })).toBeNull();
  });
});

describe('getSessionDayStartTimes', () => {
  it('should offer every hour from 8:00 to 21:00 on the day of the session', () => {
    const startTimes = getSessionDayStartTimes(new Date(2026, 10, 7, 10, 0));

    expect(startTimes).toHaveLength(14);
    expect(startTimes[0]).toEqual(new Date(2026, 10, 7, 8, 0));
    expect(startTimes[13]).toEqual(new Date(2026, 10, 7, 21, 0));
  });
});
