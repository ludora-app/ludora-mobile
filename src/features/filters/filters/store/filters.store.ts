import { create } from 'zustand';
import { Place } from '@chillui/ui';

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
};

interface FiltersStore {
  numberOfFilters: number;
  resetFilters: () => void;
  filters: Partial<Filters>;
  setFilters: (filters: Partial<Filters>) => void;
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
    const updatedFilters = { ...get().filters, ...newFilters };
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
