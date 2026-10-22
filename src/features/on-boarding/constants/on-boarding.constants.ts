import { TIconsAll } from '@/constants/icons.constants';
import { HourPreferenceDataTimePeriod } from '@/api/generated/model';

export const ON_BOARDING_STEPS_COUNT = 2;

// API days start on Sunday (0), the grid starts on Monday
export const ON_BOARDING_DAYS_OF_WEEK = [1, 2, 3, 4, 5, 6, 0];

export const ON_BOARDING_WEEK_DAYS = [1, 2, 3, 4, 5];

export const ON_BOARDING_WEEKEND_DAYS = [6, 0];

export const ON_BOARDING_MOMENTS: { icon: TIconsAll; labelKey: string; timePeriod: HourPreferenceDataTimePeriod }[] =
  [
    { icon: 'sun-fog-regular', labelKey: 'common.morning', timePeriod: HourPreferenceDataTimePeriod.MORNING },
    { icon: 'sun-regular', labelKey: 'common.afternoon', timePeriod: HourPreferenceDataTimePeriod.AFTERNOON },
    { icon: 'cloudy-with-moon-regular', labelKey: 'common.evening', timePeriod: HourPreferenceDataTimePeriod.EVENING },
  ];

export const ON_BOARDING_SPORT_LEVELS = [1, 2, 3] as const;
