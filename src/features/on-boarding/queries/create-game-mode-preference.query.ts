import { useGameModePreferencesCreate } from '@generatedApi/game-mode-preferences/game-mode-preferences.api';

import { CreateGameModePreferencesDtoFromRequest } from '@/api/generated/model';

export const useCreateGameModePreference = () => {
  const mutation = useGameModePreferencesCreate();

  const mutateAsync = (gameModePreferences: CreateGameModePreferencesDtoFromRequest) =>
    mutation.mutateAsync({ data: gameModePreferences });

  const mutate = (gameModePreferences: CreateGameModePreferencesDtoFromRequest) =>
    mutation.mutate({ data: gameModePreferences });

  return {
    ...mutation,
    mutate,
    mutateAsync,
  };
};
