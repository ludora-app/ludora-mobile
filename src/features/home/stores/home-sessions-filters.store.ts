import dayjs from 'dayjs';
import { create } from 'zustand';

import { SessionsFindAllParams } from '@/api/generated/model';

export type FiltersProps = Omit<SessionsFindAllParams, 'date'> & {
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

  if (filtersForCount.search && filtersForCount.search.length === 0) {
    delete filtersForCount.search;
  }

  return Object.values(filtersForCount).filter(value => value != null).length;
};

interface HomeSessionFiltersStore {
  reset: () => void;

  filters: FiltersProps;

  numberOfFilters: number;

  setFilters: (filters: FiltersProps) => void;
}
const getStartDay = () => {
  const now = dayjs();
  if (now.hour() >= 22) {
    return now.add(1, 'day').toISOString();
  }
  return now.toISOString();
};

export const useHomeSessionFiltersStore = create<HomeSessionFiltersStore>((set, get) => ({
  filters: {
    date: {
      date: getStartDay(),
      source: 'day-carousel',
    },
  },
  numberOfFilters: 0,
  reset: () => {
    set({
      filters: {
        date: {
          date: getStartDay(),
          source: 'day-carousel',
        },
      },
      numberOfFilters: 0,
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
