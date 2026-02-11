import { useSportPreferencesFindMySportPreferences } from '@generatedApi/sport-preferences/sport-preferences.api';

export const useGetUserSportPreferences = () => {
  const query = useSportPreferencesFindMySportPreferences();

  const data = query.data?.data?.items ?? [];

  return {
    ...query,
    data,
  };
};
