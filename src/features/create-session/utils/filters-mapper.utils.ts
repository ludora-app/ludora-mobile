import { Filters } from '@/features/filters/filters/store/filters.store';

import { FiltersProps } from '../store/create-session-filters-fields.store';

export const filtersMapper = (filters: Filters) => {
  const filter: FiltersProps = {};

  if (filters.fieldType && filters.fieldType !== 'ALL') {
    filter.type = filters.fieldType;
  } else {
    filter.type = undefined;
  }
  if (filters.sessionDuration) {
    filter.duration = parseInt(filters.sessionDuration, 10);
  } else {
    filter.duration = undefined;
  }
  if (filters.date) {
    const date = String(filters?.date.date);
    if (filters.date.source === 'filter') {
      filter.date = { date, source: 'filter' };
    } else {
      filter.date = { date, source: 'day-carousel' };
    }
  } else {
    filter.date = { date: new Date().toISOString(), source: 'day-carousel' };
  }

  if (filters.address) {
    filter.userLat = filters.address?.location?.latitude;
    filter.userLon = filters.address?.location?.longitude;
  } else {
    filter.userLat = undefined;
    filter.userLon = undefined;
  }

  if (filters.maxDistance) {
    filter.maxDistance = filters.maxDistance;
  } else {
    filter.maxDistance = undefined;
  }
  return filter;
};
