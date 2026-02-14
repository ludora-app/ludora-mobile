import { useHourPreferencesCreateMany } from '@generatedApi/hour-preferences/hour-preferences.api';

import { CreateHourPreferenceDto } from '@/api/generated/model';
import { useInvalidateHourPreferencesFindMyHourPreferences } from '@/api/generated/invalidate-queries';

export const usePutUserHoursPreferences = () => {
  const invalideUserHoursPreferences = useInvalidateHourPreferencesFindMyHourPreferences();
  const mutation = useHourPreferencesCreateMany({
    mutation: {
      onSuccess: () => invalideUserHoursPreferences(),
    },
  });

  const mutateAsync = async (data: CreateHourPreferenceDto) => mutation.mutateAsync({ data });
  const mutate = async (data: CreateHourPreferenceDto) => mutation.mutate({ data });

  return {
    ...mutation,
    mutate,
    mutateAsync,
  };
};
