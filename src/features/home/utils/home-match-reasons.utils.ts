import dayjs from '@/lib/dayjs';
import {
  HourPreferenceData,
  HourPreferenceDataType,
  SessionCollectionItemDto,
  SportPreferenceResponseData,
  HourPreferenceDataTimePeriod,
} from '@/api/generated/model';

export type MatchReason =
  | { type: 'distance'; distance: number }
  | { type: 'level' }
  | { type: 'slot'; startDate: string; timePeriod: HourPreferenceDataTimePeriod };

const MORNING_END_HOUR = 12;
const AFTERNOON_END_HOUR = 17;

/** The moment of the day a session starts in: morning before 12:00, afternoon before 17:00, evening after. */
export const getTimePeriod = (date: Date | string): HourPreferenceDataTimePeriod => {
  const hour = dayjs(date).hour();
  if (hour < MORNING_END_HOUR) return HourPreferenceDataTimePeriod.MORNING;
  if (hour < AFTERNOON_END_HOUR) return HourPreferenceDataTimePeriod.AFTERNOON;
  return HourPreferenceDataTimePeriod.EVENING;
};

const isInAvailability = ({ availability, startDate }: { availability: HourPreferenceData; startDate: string }) => {
  const start = dayjs(startDate);
  if (availability.timePeriod !== getTimePeriod(startDate)) return false;
  if (availability.type === HourPreferenceDataType.ONE_TIME) {
    return !!availability.date && dayjs(availability.date).isSame(start, 'day');
  }
  return availability.dayOfWeek === start.day();
};

/**
 * Why a recommended session matches the player, in the order of the pills: level, slot, distance.
 * TODO(SCRUM-713): read `matchReasons` from the recommended sessions once the backend returns them.
 */
export const getMatchReasons = ({
  availabilities,
  session,
  sportPreferences,
}: {
  availabilities: readonly HourPreferenceData[];
  session: Pick<SessionCollectionItemDto, 'level' | 'sport' | 'startDate' | 'userDistance'>;
  sportPreferences: readonly SportPreferenceResponseData[];
}): MatchReason[] => {
  const reasons: MatchReason[] = [];
  const sessionLevel = Number(session.level);
  const preference = sportPreferences.find(({ sport }) => sport === session.sport);

  // Level 0 is "all levels"
  if (preference && (sessionLevel === 0 || sessionLevel === preference.level)) {
    reasons.push({ type: 'level' });
  }

  if (availabilities.some(availability => isInAvailability({ availability, startDate: session.startDate }))) {
    reasons.push({ startDate: session.startDate, timePeriod: getTimePeriod(session.startDate), type: 'slot' });
  }

  if (session.userDistance > 0) {
    reasons.push({ distance: Math.round(session.userDistance * 10) / 10, type: 'distance' });
  }

  return reasons;
};
