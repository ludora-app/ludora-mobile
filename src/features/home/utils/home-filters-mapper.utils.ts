import { Filters } from '@/features/filters/filters/store/filters.store';

import { FiltersProps } from '../stores/home-sessions-filters.store';

export const homeFiltersMapper = (filters: Filters) => {
  const homeSessionFilter: FiltersProps = {};
  if (filters.sessionDuration) {
    homeSessionFilter.duration = Number(filters.sessionDuration);
  } else {
    homeSessionFilter.duration = null;
  }

  if (Array.isArray(filters.gameModes) && filters.gameModes.length > 0) {
    homeSessionFilter.gameModes = filters.gameModes;
  } else {
    homeSessionFilter.gameModes = null;
  }

  if (Array.isArray(filters.sports) && filters.sports.length > 0) {
    homeSessionFilter.sports = filters.sports;
  } else {
    homeSessionFilter.sports = null;
  }

  if (Array.isArray(filters.levels) && filters.levels.length > 0) {
    homeSessionFilter.levels = filters.levels;
  } else {
    homeSessionFilter.levels = null;
  }

  if (filters.date) {
    const date = String(filters?.date.date);
    if (filters.date.source === 'filter') {
      homeSessionFilter.date = { date, source: 'filter' };
    } else {
      homeSessionFilter.date = { date, source: 'day-carousel' };
    }
  } else {
    homeSessionFilter.date = { date: new Date().toISOString(), source: 'day-carousel' };
  }

  if (filters.address) {
    homeSessionFilter.userLat = filters.address?.location?.latitude;
    homeSessionFilter.userLon = filters.address?.location?.longitude;
  } else {
    homeSessionFilter.userLat = null;
    homeSessionFilter.userLon = null;
  }

  if (filters.maxDistance) {
    homeSessionFilter.maxDistance = filters.maxDistance;
  } else {
    homeSessionFilter.maxDistance = null;
  }
  return homeSessionFilter;
};
