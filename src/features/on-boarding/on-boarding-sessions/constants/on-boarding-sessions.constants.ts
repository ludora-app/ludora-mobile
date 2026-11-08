import { Sport } from '@/types/sports.types';
import { HourPreferenceDataTimePeriod, SessionCollectionItemDtoGameMode as GameMode } from '@/api/generated/model';

export const ON_BOARDING_SESSIONS_MAX_SUGGESTIONS = 5;

export const ON_BOARDING_SESSION_MIN_DELAY_HOURS = 48;

export const ON_BOARDING_SESSION_WEEKEND_WINDOW_DAYS = 7;

export const ON_BOARDING_SESSION_SEARCH_DAYS = 14;

export const ON_BOARDING_SESSION_DEFAULT_DURATION_MINUTES = 90;

/** Start times offered on a field, every hour from the first to the last one. */
export const ON_BOARDING_SESSION_FIRST_START_HOUR = 8;
export const ON_BOARDING_SESSION_LAST_START_HOUR = 21;

export const ON_BOARDING_SESSION_DURATIONS: Partial<Record<Sport, Partial<Record<GameMode, number>>>> = {
  FOOTBALL: { ELEVEN_V_ELEVEN: 120 },
};

export const ON_BOARDING_SESSION_DEFAULT_GAME_MODES: Partial<Record<Sport, GameMode>> = {
  BASKETBALL: GameMode.FIVE_V_FIVE,
  FOOTBALL: GameMode.FIVE_V_FIVE,
  PADEL: GameMode.TWO_V_TWO,
  TENNIS: GameMode.ONE_V_ONE,
};

export const ON_BOARDING_SESSION_MOMENT_START_TIMES: Record<
  HourPreferenceDataTimePeriod,
  { hour: number; minute: number }
> = {
  AFTERNOON: { hour: 15, minute: 0 },
  EVENING: { hour: 19, minute: 30 },
  MORNING: { hour: 10, minute: 0 },
};
