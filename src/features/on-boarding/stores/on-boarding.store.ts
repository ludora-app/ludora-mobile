import { create } from 'zustand';
import { ImagePickerAsset } from 'expo-image-picker';

import { CreateSportPreferenceData, CreateSportPreferenceDataGameModesItem } from '@/api/generated/model';

export type SportPreferences = CreateSportPreferenceData & {
  gameModes: CreateSportPreferenceDataGameModesItem[];
};

type OnBoardingState = {
  sportPreferences: SportPreferences[];
  setSportPreferences: (sportPreferences: SportPreferences) => void;
  removeSportPreference: (sport: string) => void;
  addGameMode: (sport: string, gameMode: CreateSportPreferenceDataGameModesItem) => void;
  profilePicture?: ImagePickerAsset;
  setProfilePicture: (profilePicture: ImagePickerAsset) => void;
  clearAll: () => void;
};

export const useOnBoardingStore = create<OnBoardingState>()(set => ({
  addGameMode: (sport: string, gameMode: CreateSportPreferenceDataGameModesItem) =>
    set(state => ({
      sportPreferences: state.sportPreferences.map(sportPreference => {
        if (sportPreference.sport !== sport) return sportPreference;
        const gameModes = sportPreference.gameModes ?? [];
        const isSelected = gameModes.includes(gameMode);
        return {
          ...sportPreference,
          gameModes: isSelected ? gameModes.filter(gm => gm !== gameMode) : [...gameModes, gameMode],
        };
      }),
    })),
  clearAll: () => set({ profilePicture: undefined, sportPreferences: [] }),
  profilePicture: undefined,
  removeSportPreference: (sport: string) =>
    set(state => ({
      sportPreferences: state.sportPreferences.filter(sportPreference => sportPreference.sport !== sport),
    })),
  setProfilePicture: profilePicture => set({ profilePicture }),
  setSportPreferences: sportPreference =>
    set(state => ({
      sportPreferences: [
        { ...sportPreference, gameModes: sportPreference.gameModes ?? [] },
        ...state.sportPreferences,
      ].filter((sp, index, self) => index === self.findIndex(t => t.sport === sp.sport)),
    })),
  sportPreferences: [],
}));
