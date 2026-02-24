import { create } from 'zustand';

import { UsersFindAllParams } from '@/api/generated/model';

export type PlayerFiltersProps = UsersFindAllParams;

const calculateNumberOfFilters = (filters: PlayerFiltersProps): number => {
  const { cursor, limit, name, ...filtersForCount } = filters;
  return Object.values(filtersForCount).filter(value => value != null).length;
};

interface PlayersFiltersStore {
  reset: () => void;
  numberOfFilters: number;
  filters: PlayerFiltersProps;
  setFilters: (filters: PlayerFiltersProps) => void;
}

export const usePlayersFiltersStore = create<PlayersFiltersStore>((set, get) => ({
  filters: {},
  numberOfFilters: 0,
  reset: () => {
    set({
      filters: {},
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
