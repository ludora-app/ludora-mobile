import { create } from 'zustand';

import {
  CreateGameModePreferencesDtoFromRequestGameMode,
  SportPreferenceResponseDataLevel,
} from '@/api/generated/model';

export type PreferencesSportData = {
  gameModes: CreateGameModePreferencesDtoFromRequestGameMode[];
  level: SportPreferenceResponseDataLevel;
  sport: string;
};

type SettingsPreferencesState = {
  initialize: (sportPrefs: any[], gameModePrefs: any[]) => void;
  removeSportPreference: (sport: string) => void;
  setSportPreference: (sport: string, level: SportPreferenceResponseDataLevel) => void;
  sportPreferences: PreferencesSportData[];
  toggleGameMode: (sport: string, gameMode: CreateGameModePreferencesDtoFromRequestGameMode) => void;
};

export const useSettingsPreferencesStore = create<SettingsPreferencesState>()(set => ({
  initialize: (sportPrefs: any[], gameModePrefs: any[]) =>
    set(() => {
      const sportPreferences: PreferencesSportData[] = sportPrefs.map(sp => ({
        gameModes: gameModePrefs
          .filter(gm => gm.sportPreference?.sport === sp.sport)
          .map(gm => gm.gameMode as CreateGameModePreferencesDtoFromRequestGameMode),
        level: sp.level as SportPreferenceResponseDataLevel,
        sport: sp.sport,
      }));
      return { sportPreferences };
    }),
  removeSportPreference: (sport: string) =>
    set(state => ({
      sportPreferences: state.sportPreferences.filter(sp => sp.sport !== sport),
    })),
  setSportPreference: (sport: string, level: SportPreferenceResponseDataLevel) =>
    set(state => {
      const existing = state.sportPreferences.find(sp => sp.sport === sport);
      if (existing) {
        return {
          sportPreferences: state.sportPreferences.map(sp => (sp.sport === sport ? { ...sp, level } : sp)),
        };
      }
      return {
        sportPreferences: [...state.sportPreferences, { gameModes: [], level, sport }],
      };
    }),
  sportPreferences: [],
  toggleGameMode: (sport: string, gameMode: CreateGameModePreferencesDtoFromRequestGameMode) =>
    set(state => ({
      sportPreferences: state.sportPreferences.map(sp => {
        if (sp.sport !== sport) return sp;
        const gameModes = sp.gameModes ?? [];
        const isSelected = gameModes.includes(gameMode);
        return {
          ...sp,
          gameModes: isSelected ? gameModes.filter(gm => gm !== gameMode) : [...gameModes, gameMode],
        };
      }),
    })),
}));
