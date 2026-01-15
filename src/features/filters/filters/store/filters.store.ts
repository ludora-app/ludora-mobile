import { create } from 'zustand';
import { Place } from '@chillui/ui';

import { SESSION_LEVEL_TYPE } from '@/constants/session.constants';
import { CreateSessionFromRequestDtoGameMode, SessionsFindAllSportsItem } from '@/api/generated/model';

export type Filters = {
  fieldType: 'PRIVATE' | 'PUBLIC' | 'ALL';
  sessionDuration: string;
  date: {
    date: Date;
    source: 'filter' | 'carousel';
  };
  selectedDayCarouselDate: string;
  maxDistance: number;
  address: Place;
  nearby: boolean;
  sports: SessionsFindAllSportsItem[];
  levels: SESSION_LEVEL_TYPE['code'][];
  gameModes: CreateSessionFromRequestDtoGameMode[];
};

interface FiltersStore {
  numberOfFilters: number;
  resetFilters: () => void;
  filters: Partial<Filters>;
  setFilters: (filters: Partial<Filters> | ((prev: Partial<Filters>) => Partial<Filters>)) => void;
}

export const useFiltersStore = create<FiltersStore>((set, get) => ({
  filters: { fieldType: 'ALL' },
  numberOfFilters: 0,
  resetFilters: () => {
    set({
      filters: {
        date: {
          date: get().filters?.selectedDayCarouselDate ? new Date(get().filters?.selectedDayCarouselDate) : new Date(),
          source: 'carousel',
        },
        fieldType: 'ALL',
        selectedDayCarouselDate: get().filters?.selectedDayCarouselDate,
      },
      numberOfFilters: 0,
    });
  },
  setFilters: newFilters => {
    const filtersToApply = typeof newFilters === 'function' ? newFilters(get().filters) : newFilters;
    const updatedFilters = { ...get().filters, ...filtersToApply };
    const numberOfFilters = Object.keys(updatedFilters).filter(key => {
      const value = updatedFilters[key as keyof Filters];

      if (key === 'fieldType' && value === 'ALL') return false;

      if (key === 'selectedDayCarouselDate') return false;

      if (key === 'date') {
        if (updatedFilters?.date?.source === 'carousel') return false;
      }

      return value !== undefined;
    }).length;

    set({ filters: updatedFilters, numberOfFilters });
  },
}));
