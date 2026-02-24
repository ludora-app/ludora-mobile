import { Filters } from '@/features/filters/filters/store/filters.store';

import { PlayerFiltersProps } from '../stores/players-filters.store';

export const playersFiltersMapper = (filters: Filters) => {
  const playerFilter: PlayerFiltersProps = {};

  if (Array.isArray(filters.sports) && filters.sports.length > 0) {
    playerFilter.sports = filters.sports;
  } else {
    playerFilter.sports = undefined;
  }

  if (Array.isArray(filters.levels) && filters.levels.length > 0) {
    playerFilter.levels = filters.levels as any; // Assuming levels mapping is direct or handled
  } else {
    playerFilter.levels = undefined;
  }

  return playerFilter;
};
