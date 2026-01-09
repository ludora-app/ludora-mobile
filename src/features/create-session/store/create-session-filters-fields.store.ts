import dayjs from 'dayjs';
import { create } from 'zustand';

import { FieldsFindAllVerifiedParams } from '@/api/generated/model';

export type FiltersProps = Omit<FieldsFindAllVerifiedParams, 'date'> & {
  date?: {
    date: string;
    source: 'day-carousel' | 'filter';
  };
};

const calculateNumberOfFilters = (filters: FiltersProps): number => {
  const filtersForCount = { ...filters };

  const filterDate = filters.date?.date ? dayjs(filters.date.date).format('YYYY-MM-DD') : null;

  if (filters.date?.source === 'day-carousel' || filterDate === dayjs().format('YYYY-MM-DD')) {
    delete filtersForCount.date;
  }

  if (filtersForCount.userLat && filtersForCount.userLon) {
    delete filtersForCount.userLon;
  }

  delete filtersForCount.search;
  delete filtersForCount.gameModes;
  delete filtersForCount.sports;
  return Object.values(filtersForCount).filter(value => value != null).length;
};

interface CreateSessionFiltersFieldsStore {
  reset: () => void;

  filters: FiltersProps;

  numberOfFilters: number;

  setFilters: (filters: FiltersProps) => void;
}

export const useCreateSessionFiltersFieldsStore = create<CreateSessionFiltersFieldsStore>((set, get) => ({
  filters: {
    date: {
      date: new Date().toISOString(),
      source: 'day-carousel',
    },
  },
  numberOfFilters: 0,
  reset: () => {
    const currentFilters = get().filters;
    const resetFilters: FiltersProps = {
      date:
        currentFilters.date?.source === 'day-carousel'
          ? currentFilters.date
          : {
              date: new Date().toISOString(),
              source: 'day-carousel',
            },
    };

    if (currentFilters.gameModes) {
      resetFilters.gameModes = currentFilters.gameModes;
    }

    if (currentFilters.sports) {
      resetFilters.sports = currentFilters.sports;
    }

    set({
      filters: resetFilters,
      numberOfFilters: calculateNumberOfFilters(resetFilters),
    });
  },

  setFilters: filters => {
    const updatedFilters = { ...get().filters, ...filters };
    set({
      filters: updatedFilters,
      numberOfFilters: calculateNumberOfFilters(updatedFilters),
    });
  },
}));
