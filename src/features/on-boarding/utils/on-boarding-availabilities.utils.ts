import dayjs from '@/lib/dayjs';
import { HourPreferenceData, HourPreferenceDataTimePeriod, HourPreferenceDataType } from '@/api/generated/model';

import { OnBoardingAvailability } from '../types/on-boarding.types';
import { ON_BOARDING_MOMENTS, ON_BOARDING_DAYS_OF_WEEK } from '../constants/on-boarding.constants';

export const isSameAvailability = (a: OnBoardingAvailability, b: OnBoardingAvailability) =>
  a.dayOfWeek === b.dayOfWeek && a.timePeriod === b.timePeriod;

/** Every slot of the given days and moments (defaults: the whole week, every moment). */
export const getAvailabilities = ({
  daysOfWeek = ON_BOARDING_DAYS_OF_WEEK,
  timePeriods = ON_BOARDING_MOMENTS.map(moment => moment.timePeriod),
}: {
  daysOfWeek?: number[];
  timePeriods?: HourPreferenceDataTimePeriod[];
}): OnBoardingAvailability[] =>
  daysOfWeek.flatMap(dayOfWeek => timePeriods.map(timePeriod => ({ dayOfWeek, timePeriod })));

export const areAllAvailabilitiesSelected = ({
  availabilities,
  selected,
}: {
  availabilities: OnBoardingAvailability[];
  selected: OnBoardingAvailability[];
}) => availabilities.every(availability => selected.some(item => isSameAvailability(item, availability)));

export const toHourPreferences = (availabilities: OnBoardingAvailability[]): HourPreferenceData[] =>
  availabilities.map(availability => ({ ...availability, type: HourPreferenceDataType.RECURRENT }));

/** Day label in the app locale: `L` for the grid header, `Lun.` for the recap. */
export const getDayLabel = ({ dayOfWeek, format }: { dayOfWeek: number; format: 'letter' | 'short' }) => {
  const label = dayjs().day(dayOfWeek).format(format === 'letter' ? 'dd' : 'ddd');
  if (format === 'letter') return label.charAt(0).toUpperCase();
  return label.charAt(0).toUpperCase() + label.slice(1);
};
