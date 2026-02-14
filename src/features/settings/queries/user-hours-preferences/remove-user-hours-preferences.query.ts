import { useHourPreferencesRemove } from '@generatedApi/hour-preferences/hour-preferences.api';

import { useInvalidateHourPreferencesFindMyHourPreferences } from '@/api/generated/invalidate-queries';

export const useRemoveUserHoursPreferences = () => {
  const invalidateUserHoursPreferences = useInvalidateHourPreferencesFindMyHourPreferences();
  const mutation = useHourPreferencesRemove({
    mutation: {
      onSuccess: () => invalidateUserHoursPreferences(),
    },
  });

  const mutateAsync = () => mutation.mutateAsync();
  const mutate = () => mutation.mutate();

  return {
    ...mutation,
    mutate,
    mutateAsync,
  };
};
