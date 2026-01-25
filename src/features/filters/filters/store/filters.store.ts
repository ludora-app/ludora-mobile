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

export type FilterSource = 'filter_sessions_all' | 'filter_fields';

interface FiltersStoreInstance {
  filters: Partial<Filters>;
  numberOfFilters: number;
}

interface FiltersStore {
  instances: Record<FilterSource, FiltersStoreInstance>;
  currentSource: FilterSource;
  setCurrentSource: (source: FilterSource) => void;
  resetFilters: () => void;
  setFilters: (filters: Partial<Filters> | ((prev: Partial<Filters>) => Partial<Filters>)) => void;
}

const createDefaultInstance = (): FiltersStoreInstance => ({
  filters: { fieldType: 'ALL' },
  numberOfFilters: 0,
});

const calculateNumberOfFilters = (filters: Partial<Filters>): number => {
  return Object.keys(filters).filter(key => {
    const value = filters[key as keyof Filters];

    if (key === 'fieldType' && value === 'ALL') return false;
    if (key === 'selectedDayCarouselDate') return false;
    if (key === 'date') {
      if (filters?.date?.source === 'carousel') return false;
    }

    // Check for empty arrays
    if (Array.isArray(value) && value.length === 0) return false;

    return value !== undefined;
  }).length;
};

export const useFiltersStore = create<FiltersStore>((set, get) => ({
  instances: {
    filter_sessions_all: createDefaultInstance(),
    filter_fields: createDefaultInstance(),
  },
  currentSource: 'filter_sessions_all',

  setCurrentSource: source => {
    set({ currentSource: source });
  },

  resetFilters: () => {
    const { currentSource, instances } = get();
    const currentInstance = instances[currentSource];

    const resetFilters: Partial<Filters> = {
      date: {
        date: currentInstance.filters?.selectedDayCarouselDate
          ? new Date(currentInstance.filters.selectedDayCarouselDate)
          : new Date(),
        source: 'carousel',
      },
      fieldType: 'ALL',
      selectedDayCarouselDate: currentInstance.filters?.selectedDayCarouselDate,
    };

    set({
      instances: {
        ...instances,
        [currentSource]: {
          filters: resetFilters,
          numberOfFilters: 0,
        },
      },
    });
  },

  setFilters: newFilters => {
    const { currentSource, instances } = get();
    const currentInstance = instances[currentSource];

    const filtersToApply = typeof newFilters === 'function' ? newFilters(currentInstance.filters) : newFilters;
    const updatedFilters = { ...currentInstance.filters, ...filtersToApply };
    const numberOfFilters = calculateNumberOfFilters(updatedFilters);

    set({
      instances: {
        ...instances,
        [currentSource]: {
          filters: updatedFilters,
          numberOfFilters,
        },
      },
    });
  },
}));

export const selectFilters = (state: FiltersStore) => state.instances[state.currentSource].filters;
export const selectNumberOfFilters = (state: FiltersStore) => state.instances[state.currentSource].numberOfFilters;
