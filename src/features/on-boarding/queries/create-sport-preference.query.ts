import { useSportPreferencesCreate } from '@generatedApi/sport-preferences/sport-preferences.api';

import { CreateSportPreferenceDtoFromRequest } from '@/api/generated/model';

export const useCreateSportPreference = () => {
  const mutation = useSportPreferencesCreate();

  const mutateAsync = (sportPreferences: CreateSportPreferenceDtoFromRequest) =>
    mutation.mutateAsync({ data: sportPreferences });

  const mutate = (sportPreferences: CreateSportPreferenceDtoFromRequest) => mutation.mutate({ data: sportPreferences });

  return {
    ...mutation,
    mutate,
    mutateAsync,
  };
};
