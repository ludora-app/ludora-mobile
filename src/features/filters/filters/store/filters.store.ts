import dayjs from 'dayjs';
import { create } from 'zustand';
import { Place } from '@chillui/ui';

export type Filters = {
  fieldType: 'PRIVATE' | 'PUBLIC' | 'ALL';
  sessionDuration: string;
  date: Date;
  maxDistance: number;
  address: Place;
  nearby: boolean;
};

interface FiltersStore {
  numberOfFilters: number;
  resetFilters: () => void;
  filters: Partial<Filters>;
  setFilters: (filters: Partial<Filters>) => void;
}

export const useFiltersStore = create<FiltersStore>((set, get) => ({
  filters: { date: new Date(), fieldType: 'ALL' },
  numberOfFilters: 0,
  resetFilters: () => {
    set({ filters: { date: new Date(), fieldType: 'ALL' }, numberOfFilters: 0 });
  },
  setFilters: newFilters => {
    const updatedFilters = { ...get().filters, ...newFilters };

    const numberOfFilters = Object.keys(updatedFilters).filter(key => {
      const value = updatedFilters[key as keyof Filters];

      if (key === 'fieldType' && value === 'ALL') return false;

      if (key === 'date' && value instanceof Date) {
        if (dayjs(value).isSame(dayjs(), 'day')) return false;
      }

      return value !== undefined;
    }).length;

    set({ filters: updatedFilters, numberOfFilters });
  },
}));
