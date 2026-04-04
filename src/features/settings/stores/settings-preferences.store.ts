import { create } from 'zustand';

import {
  CreateSportPreferenceData,
  CreateSportPreferenceDto,
  SportPreferenceResponseData,
  SportPreferenceResponseDataLevel,
} from '@/api/generated/model';

export type PreferencesSportData = CreateSportPreferenceData;

type PreferencesGameModeData = CreateSportPreferenceData['gameModes'][number];

type PreferencesLevelData = CreateSportPreferenceData['level'];

type PreferencesSport = CreateSportPreferenceData['sport'];

type SettingsPreferencesState = CreateSportPreferenceDto & {
  initialize: (sportPrefs: readonly SportPreferenceResponseData[]) => void;
  removeSportPreference: (sport: PreferencesSport) => void;
  setSportPreference: (sport: PreferencesSport, level: PreferencesLevelData) => void;
  toggleGameMode: (sport: PreferencesSport, gameMode: PreferencesGameModeData) => void;
  toggleSportPreference: (sport: string) => void;
};

export const useSettingsPreferencesStore = create<SettingsPreferencesState>()(set => ({
  initialize: (sportPrefs: readonly SportPreferenceResponseData[]) =>
    set(() => {
      const sportPreferences: PreferencesSportData[] = sportPrefs.map(sp => ({
        gameModes: sp.gameModes ?? [],
        level: sp.level as SportPreferenceResponseDataLevel,
        sport: sp.sport,
      }));
      return { sportPreferences };
    }),
  removeSportPreference: (sport: PreferencesSport) =>
    set(state => ({
      sportPreferences: state.sportPreferences.filter(sp => sp.sport !== sport),
    })),
  setSportPreference: (sport: PreferencesSport, level: PreferencesLevelData) =>
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
  toggleGameMode: (sport: PreferencesSport, gameMode: PreferencesGameModeData) =>
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
  toggleSportPreference: (sport: string) =>
    set(state => {
      const existing = state.sportPreferences.find(sp => sp.sport === sport);
      if (existing && existing.level === 3) {
        return {
          sportPreferences: state.sportPreferences.filter(sp => sp.sport !== sport),
        };
      }
      const nextLevel = existing ? existing.level + 1 : 1;
      if (existing) {
        return {
          sportPreferences: state.sportPreferences.map(sp =>
            sp.sport === sport ? { ...sp, level: nextLevel as SportPreferenceResponseDataLevel } : sp,
          ),
        };
      }
      return {
        sportPreferences: [
          ...state.sportPreferences,
          {
            gameModes: [],
            level: nextLevel as SportPreferenceResponseDataLevel,
            sport: sport as CreateSportPreferenceData['sport'],
          },
        ],
      };
    }),
}));
