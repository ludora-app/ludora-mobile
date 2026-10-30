import { TIconsAll } from '@/constants/icons.constants';
import { HourPreferenceDataTimePeriod, UpdatePlayAreaDtoRadiusKm } from '@/api/generated/model';

export const ON_BOARDING_STEPS_COUNT = 3;

export const ON_BOARDING_PLAY_AREA_STEP = 2;

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

// Rounded corners the map runs under: --radius-header and --radius-sheet in global.css
export const ON_BOARDING_HEADER_RADIUS = 34;

export const ON_BOARDING_MAP_SHEET_RADIUS = 30;

export const ON_BOARDING_PLAY_AREA_RADIUS_OPTIONS = Object.values(UpdatePlayAreaDtoRadiusKm);

export const ON_BOARDING_PLAY_AREA_DEFAULT_RADIUS_KM = UpdatePlayAreaDtoRadiusKm.NUMBER_10;

// The IGN geocoding API rejects queries under 3 characters
export const ON_BOARDING_PLACES_MIN_QUERY_LENGTH = 3;

export const ON_BOARDING_PLACES_MAX_SUGGESTIONS = 4;
