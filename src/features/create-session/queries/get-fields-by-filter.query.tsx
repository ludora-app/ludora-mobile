import { useUserLocationStore } from '@/stores/user-geolocalisation.store';

import { useGetFields } from './get-fields.query';
import { FiltersProps, useCreateSessionFiltersFieldsStore } from '../store/create-session-filters-fields.store';

const LIMIT_RESULTS_FIELDS = 10;

export const useGetAllFieldsByFilter = () => {
  const filters = useCreateSessionFiltersFieldsStore(state => state.filters);

  const cleanedFilters = Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== null));

  const { date: filterDate, ...restFilters } = (cleanedFilters as FiltersProps) || {};

  const location = useUserLocationStore(state => state.location);

  const dateValue = filterDate?.date;

  const { data, ...rest } = useGetFields({
    date: dateValue,
    limit: LIMIT_RESULTS_FIELDS,
    userLat: location?.latitude,
    userLon: location?.longitude,
    ...restFilters,
  });

  const items = data?.pages.flatMap(page => page.data.items) ?? [];
  const totalCount = data?.pages[0]?.data.totalCount ?? 0;

  return { items, totalCount, ...rest };
};
