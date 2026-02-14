import { useHourPreferencesFindMyHourPreferences } from '@generatedApi/hour-preferences/hour-preferences.api';

export const useGetUserHoursPreferences = () => {
  const query = useHourPreferencesFindMyHourPreferences();

  const data = query.data?.data?.items ?? [];

  return {
    ...query,
    data,
  };
};
