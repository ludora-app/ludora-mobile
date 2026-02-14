import { useSportPreferencesRemove } from '@generatedApi/sport-preferences/sport-preferences.api';

import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { useInvalidateUsersFindMe } from '@/api/generated/invalidate-queries';

const TrackUserPreferencesMapper = () => ({
  game_mode_basketball: undefined,
  game_mode_football: undefined,
  game_mode_padel: undefined,
  game_mode_tennis: undefined,
  level_basketball: undefined,
  level_football: undefined,
  level_padel: undefined,
  level_tennis: undefined,
  sports_preferences: undefined,
});

export const useRemoveUserSportPreferences = () => {
  const { trackIdentity } = useAnalytics();
  const invalidateUserMe = useInvalidateUsersFindMe();
  const mutation = useSportPreferencesRemove({
    mutation: {
      onSuccess: () => invalidateUserMe(),
    },
  });

  const mutateAsync = () =>
    mutation.mutateAsync(undefined, {
      onSuccess: () => trackIdentity(TrackUserPreferencesMapper()),
    });
  const mutate = () =>
    mutation.mutate(undefined, {
      onSuccess: () => trackIdentity(TrackUserPreferencesMapper()),
    });

  return {
    ...mutation,
    mutate,
    mutateAsync,
  };
};
