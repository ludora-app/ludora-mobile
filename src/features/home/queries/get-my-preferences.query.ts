import { useHourPreferencesFindMyHourPreferences } from '@generatedApi/hour-preferences/hour-preferences.api';
import { useSportPreferencesFindMySportPreferences } from '@generatedApi/sport-preferences/sport-preferences.api';

import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';
import { HourPreferenceData, SportPreferenceResponseData } from '@/api/generated/model';

const EMPTY_SPORT_PREFERENCES: SportPreferenceResponseData[] = [];
const EMPTY_AVAILABILITIES: HourPreferenceData[] = [];

/** The player's sports (with level and formats) and availabilities, as answered at the on-boarding. */
export const useGetMyPreferences = () => {
  const sportPreferencesQuery = useSportPreferencesFindMySportPreferences();
  const hourPreferencesQuery = useHourPreferencesFindMyHourPreferences();

  const error = sportPreferencesQuery.error ?? hourPreferencesQuery.error;
  const isError = sportPreferencesQuery.isError || hourPreferencesQuery.isError;
  useGetMethodErrorTracking({ error, extra: { context: 'useGetMyPreferences' }, isError });

  // The backend answers `data: null` when the player has no preference yet
  const sportPreferences = sportPreferencesQuery.data?.data?.items ?? EMPTY_SPORT_PREFERENCES;
  const availabilities = hourPreferencesQuery.data?.data?.items ?? EMPTY_AVAILABILITIES;

  return {
    availabilities,
    hasSportPreferences: sportPreferences.length > 0,
    isError,
    isLoading: sportPreferencesQuery.isLoading || hourPreferencesQuery.isLoading,
    isSuccess: sportPreferencesQuery.isSuccess && hourPreferencesQuery.isSuccess,
    /** Settled once both queries answered or failed: an error reads as "no preference". */
    isSettled: !sportPreferencesQuery.isLoading && !hourPreferencesQuery.isLoading,
    sportPreferences,
  };
};
