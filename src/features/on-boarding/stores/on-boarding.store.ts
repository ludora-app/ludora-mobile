import { create } from 'zustand';

import { CreateSportPreferenceData, CreateSportPreferenceDataGameModesItem } from '@/api/generated/model';

import { OnBoardingAvailability } from '../types/on-boarding.types';
import { isSameAvailability } from '../on-boarding-profile/utils/on-boarding-availabilities.utils';

export type SportPreferences = CreateSportPreferenceData & {
  gameModes: CreateSportPreferenceDataGameModesItem[];
};

type OnBoardingState = {
  availabilities: OnBoardingAvailability[];
  clearAll: () => void;
  removeSportPreference: (sport: string) => void;
  setAvailabilities: (availabilities: OnBoardingAvailability[], isSelected: boolean) => void;
  sportPreferences: SportPreferences[];
  upsertSportPreference: (sportPreference: SportPreferences) => void;
};

export const useOnBoardingStore = create<OnBoardingState>()(set => ({
  availabilities: [],
  clearAll: () => set({ availabilities: [], sportPreferences: [] }),
  removeSportPreference: (sport: string) =>
    set(state => ({
      sportPreferences: state.sportPreferences.filter(sportPreference => sportPreference.sport !== sport),
    })),
  // Selects or unselects a group of slots at once (a cell, a day, a moment or a shortcut)
  setAvailabilities: (availabilities, isSelected) =>
    set(state => {
      const others = state.availabilities.filter(
        availability => !availabilities.some(item => isSameAvailability(item, availability)),
      );
      return { availabilities: isSelected ? [...others, ...availabilities] : others };
    }),
  sportPreferences: [],
  upsertSportPreference: sportPreference =>
    set(state => {
      const isExisting = state.sportPreferences.some(item => item.sport === sportPreference.sport);
      if (!isExisting) return { sportPreferences: [...state.sportPreferences, sportPreference] };
      return {
        sportPreferences: state.sportPreferences.map(item =>
          item.sport === sportPreference.sport ? sportPreference : item,
        ),
      };
    }),
}));
