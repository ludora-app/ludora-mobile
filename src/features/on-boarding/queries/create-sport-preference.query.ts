import { useSportPreferencesCreateManyWithGameModes } from '@generatedApi/sport-preferences/sport-preferences.api';

import { CreateSportPreferenceDto } from '@/api/generated/model';

export const useCreateSportPreference = () => {
  const mutation = useSportPreferencesCreateManyWithGameModes();

  const mutateAsync = (sportPreferences: CreateSportPreferenceDto) => mutation.mutateAsync({ data: sportPreferences });

  const mutate = (sportPreferences: CreateSportPreferenceDto) => mutation.mutate({ data: sportPreferences });

  return {
    ...mutation,
    mutate,
    mutateAsync,
  };
};
