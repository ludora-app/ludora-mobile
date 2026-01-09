import { Filters } from '@/features/filters/filters/store/filters.store';

import { FiltersProps } from '../store/create-session-filters-fields.store';

export const filtersMapper = (filters: Filters) => {
  const filter: FiltersProps = {};

  if (filters.fieldType && filters.fieldType !== 'ALL') {
    filter.type = filters.fieldType;
  } else {
    filter.type = null;
  }
  if (filters.sessionDuration) {
    filter.duration = parseInt(filters.sessionDuration, 10);
  } else {
    filter.duration = null;
  }
  if (filters.date) {
    const date = String(filters?.date);
    filter.date = { date, source: 'filter' };
  } else {
    filter.date = { date: new Date().toISOString(), source: 'day-carousel' };
  }

  if (filters.address) {
    filter.userLat = filters.address?.location?.latitude;
    filter.userLon = filters.address?.location?.longitude;
  } else {
    filter.userLat = null;
    filter.userLon = null;
  }

  if (filters.maxDistance) {
    filter.maxDistance = filters.maxDistance;
  } else {
    filter.maxDistance = null;
  }
  return filter;
};
