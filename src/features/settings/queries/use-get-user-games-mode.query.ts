import { useGameModePreferencesFindMyGameModePreferences } from '@generatedApi/game-mode-preferences/game-mode-preferences.api';

export const useGetUserGamesMode = () => {
  const query = useGameModePreferencesFindMyGameModePreferences();

  const data = query?.data?.data?.items ?? [];

  return {
    ...query,
    data,
  };
};
