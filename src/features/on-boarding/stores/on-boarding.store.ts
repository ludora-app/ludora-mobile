import { create } from 'zustand';

import {
  CreateSportPreferenceData,
  UpdatePlayAreaDtoRadiusKm,
  CreateSportPreferenceDataGameModesItem,
} from '@/api/generated/model';

import { OnBoardingAvailability, OnBoardingPlayArea } from '../types/on-boarding.types';
import { isSameAvailability } from '../on-boarding-profile/utils/on-boarding-availabilities.utils';
import { ON_BOARDING_PLAY_AREA_DEFAULT_RADIUS_KM } from '../on-boarding-profile/constants/on-boarding.constants';

export type SportPreferences = CreateSportPreferenceData & {
  gameModes: CreateSportPreferenceDataGameModesItem[];
};

type OnBoardingState = {
  availabilities: OnBoardingAvailability[];
  clearAll: () => void;
  isPlayAreaMapVisible: boolean;
  playArea: OnBoardingPlayArea | null;
  playAreaRadiusKm: UpdatePlayAreaDtoRadiusKm;
  removeSportPreference: (sport: string) => void;
  setAvailabilities: (availabilities: OnBoardingAvailability[], isSelected: boolean) => void;
  setIsPlayAreaMapVisible: (isPlayAreaMapVisible: boolean) => void;
  setPlayArea: (playArea: OnBoardingPlayArea) => void;
  setPlayAreaRadiusKm: (playAreaRadiusKm: UpdatePlayAreaDtoRadiusKm) => void;
  sportPreferences: SportPreferences[];
  upsertSportPreference: (sportPreference: SportPreferences) => void;
};

export const useOnBoardingStore = create<OnBoardingState>()(set => ({
  availabilities: [],
  clearAll: () =>
    set({
      availabilities: [],
      isPlayAreaMapVisible: false,
      playArea: null,
      playAreaRadiusKm: ON_BOARDING_PLAY_AREA_DEFAULT_RADIUS_KM,
      sportPreferences: [],
    }),
  isPlayAreaMapVisible: false,
  playArea: null,
  playAreaRadiusKm: ON_BOARDING_PLAY_AREA_DEFAULT_RADIUS_KM,
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
  setIsPlayAreaMapVisible: isPlayAreaMapVisible => set({ isPlayAreaMapVisible }),
  setPlayArea: playArea => set({ playArea }),
  setPlayAreaRadiusKm: playAreaRadiusKm => set({ playAreaRadiusKm }),
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
