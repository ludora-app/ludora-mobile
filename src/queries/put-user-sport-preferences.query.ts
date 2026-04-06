import { useSportPreferencesCreateManyWithGameModes } from '@generatedApi/sport-preferences/sport-preferences.api';

import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { useInvalidateUsersFindMe } from '@/api/generated/invalidate-queries';
import { CreateSportPreferenceDataSport, CreateSportPreferenceDto } from '@/api/generated/model';

const TrackUserPreferencesMapper = (data: CreateSportPreferenceDto) => ({
  game_mode_basketball: data.sportPreferences.find(sportPreference => sportPreference.sport === 'BASKETBALL')
    ?.gameModes,
  game_mode_football: data.sportPreferences.find(
    sportPreference => sportPreference.sport === CreateSportPreferenceDataSport.FOOTBALL,
  )?.gameModes,
  game_mode_padel: data.sportPreferences.find(
    sportPreference => sportPreference.sport === CreateSportPreferenceDataSport.PADEL,
  )?.gameModes,
  game_mode_tennis: data.sportPreferences.find(
    sportPreference => sportPreference.sport === CreateSportPreferenceDataSport.TENNIS,
  )?.gameModes,
  level_basketball: data.sportPreferences.find(
    sportPreference => sportPreference.sport === CreateSportPreferenceDataSport.BASKETBALL,
  )?.level,
  level_football: data.sportPreferences.find(
    sportPreference => sportPreference.sport === CreateSportPreferenceDataSport.FOOTBALL,
  )?.level,
  level_padel: data.sportPreferences.find(
    sportPreference => sportPreference.sport === CreateSportPreferenceDataSport.PADEL,
  )?.level,
  level_tennis: data.sportPreferences.find(
    sportPreference => sportPreference.sport === CreateSportPreferenceDataSport.TENNIS,
  )?.level,
  sports_preferences: data.sportPreferences.map(sportPreference => sportPreference.sport),
});

export const usePutUserSportPreferences = () => {
  const { trackIdentity } = useAnalytics();
  const invalidateUserMe = useInvalidateUsersFindMe();
  const mutation = useSportPreferencesCreateManyWithGameModes({
    mutation: {
      onSuccess: () => invalidateUserMe(),
    },
  });

  const mutateAsync = (data: CreateSportPreferenceDto) =>
    mutation.mutateAsync(
      { data },
      {
        onSuccess: () => trackIdentity(TrackUserPreferencesMapper(data)),
      },
    );
  const mutate = (data: CreateSportPreferenceDto) =>
    mutation.mutate(
      { data },
      {
        onSuccess: () => trackIdentity(TrackUserPreferencesMapper(data)),
      },
    );

  return {
    ...mutation,
    mutate,
    mutateAsync,
  };
};
