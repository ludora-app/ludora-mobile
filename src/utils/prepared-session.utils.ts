import dayjs, { Dayjs } from '@/lib/dayjs';
import { Sport } from '@/types/sports.types';
import {
  HourPreferenceData,
  HourPreferenceDataType,
  SportPreferenceResponseData,
  HourPreferenceDataTimePeriod,
  SessionCollectionItemDtoGameMode as GameMode,
} from '@/api/generated/model';
import {
  PREPARED_SESSION_DURATIONS,
  PREPARED_SESSION_SEARCH_DAYS,
  PREPARED_SESSION_LAST_START_HOUR,
  PREPARED_SESSION_MIN_DELAY_HOURS,
  PREPARED_SESSION_FIRST_START_HOUR,
  PREPARED_SESSION_DEFAULT_GAME_MODES,
  PREPARED_SESSION_MOMENT_START_TIMES,
  PREPARED_SESSION_WEEKEND_WINDOW_DAYS,
  PREPARED_SESSION_DEFAULT_DURATION_MINUTES,
} from '@/constants/prepared-session.constants';

export type PreparedSessionValues = {
  endDate: Date;
  gameMode: GameMode;
  isWithoutAvailabilities: boolean;
  level: SportPreferenceResponseData['level'];
  sport: Sport;
  startDate: Date;
};

const SATURDAY = 6;
const SUNDAY = 0;

const getSlotStart = (day: Dayjs, timePeriod: HourPreferenceDataTimePeriod) => {
  const { hour, minute } = PREPARED_SESSION_MOMENT_START_TIMES[timePeriod];
  return day.hour(hour).minute(minute).second(0).millisecond(0);
};

const isAvailabilityDay = (day: Dayjs, availability: HourPreferenceData) => {
  if (availability.type === HourPreferenceDataType.ONE_TIME) {
    return !!availability.date && dayjs(availability.date).isSame(day, 'day');
  }
  return day.day() === availability.dayOfWeek;
};

const isWeekend = (date: Dayjs) => date.day() === SATURDAY || date.day() === SUNDAY;

const getNextSaturdayMorning = (earliest: Dayjs) => {
  const daysUntilSaturday = (SATURDAY - earliest.day() + 7) % 7;
  const saturday = getSlotStart(earliest.add(daysUntilSaturday, 'day'), HourPreferenceDataTimePeriod.MORNING);
  return saturday.isBefore(earliest) ? saturday.add(7, 'day') : saturday;
};

/**
 * The sport of the prepared session: the one with the highest level, the first chosen on a tie.
 * Its first format, or the sport's default format.
 */
export const getPreparedSessionSport = (sportPreferences: readonly SportPreferenceResponseData[]) => {
  const [firstPreference, ...otherPreferences] = sportPreferences;
  if (!firstPreference) return null;

  const preference = otherPreferences.reduce(
    (best, item) => (item.level > best.level ? item : best),
    firstPreference,
  );
  const gameMode =
    preference.gameModes[0] ?? PREPARED_SESSION_DEFAULT_GAME_MODES[preference.sport] ?? GameMode.FIVE_V_FIVE;

  return { gameMode, level: preference.level, sport: preference.sport };
};

/**
 * The start of the prepared session: the earliest availability slot at least 48 hours away,
 * a weekend slot first when one exists within the next 7 days. Without any slot, the first
 * Saturday morning at least 48 hours away.
 */
export const getPreparedSessionStartDate = ({
  availabilities,
  now,
}: {
  availabilities: readonly HourPreferenceData[];
  now: Date;
}) => {
  const earliest = dayjs(now).add(PREPARED_SESSION_MIN_DELAY_HOURS, 'hour');
  const days = Array.from({ length: PREPARED_SESSION_SEARCH_DAYS + 1 }, (_, index) =>
    earliest.startOf('day').add(index, 'day'),
  );
  const slots = days
    .flatMap(day =>
      availabilities
        .filter(availability => isAvailabilityDay(day, availability))
        .map(availability => getSlotStart(day, availability.timePeriod)),
    )
    .filter(slot => !slot.isBefore(earliest))
    .sort((a, b) => a.valueOf() - b.valueOf());

  const weekendLimit = earliest.add(PREPARED_SESSION_WEEKEND_WINDOW_DAYS, 'day');
  const weekendSlot = slots.find(slot => isWeekend(slot) && !slot.isAfter(weekendLimit));
  const slot = weekendSlot ?? slots[0] ?? getNextSaturdayMorning(earliest);

  return slot.toDate();
};

/** The start times offered on the day of the session, every hour. */
export const getSessionDayStartTimes = (date: Date) =>
  Array.from({ length: PREPARED_SESSION_LAST_START_HOUR - PREPARED_SESSION_FIRST_START_HOUR + 1 }, (_, index) =>
    dayjs(date)
      .hour(PREPARED_SESSION_FIRST_START_HOUR + index)
      .minute(0)
      .second(0)
      .millisecond(0)
      .toDate(),
  );

export const getPreparedSessionDuration = ({ gameMode, sport }: { gameMode: GameMode; sport: Sport }) =>
  PREPARED_SESSION_DURATIONS[sport]?.[gameMode] ?? PREPARED_SESSION_DEFAULT_DURATION_MINUTES;

/**
 * Computes the first session Ludora prepares from the on-boarding answers (decision D7).
 * Returns null without any sport preference: no session is prepared then.
 */
export const getPreparedSession = ({
  availabilities,
  now,
  sportPreferences,
}: {
  availabilities: readonly HourPreferenceData[];
  now: Date;
  sportPreferences: readonly SportPreferenceResponseData[];
}): PreparedSessionValues | null => {
  const preparedSport = getPreparedSessionSport(sportPreferences);
  if (!preparedSport) return null;

  const startDate = getPreparedSessionStartDate({ availabilities, now });
  const duration = getPreparedSessionDuration(preparedSport);

  return {
    ...preparedSport,
    endDate: dayjs(startDate).add(duration, 'minute').toDate(),
    isWithoutAvailabilities: availabilities.length === 0,
    startDate,
  };
};
