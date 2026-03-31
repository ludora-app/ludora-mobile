import { useMemo } from 'react';

import { filterObjectEntries } from '@/utils/filters.utils';
import { useUserLocationStore } from '@/stores/user-geolocalisation.store';
import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';

import { useGetFields } from './get-fields.query';
import { FiltersProps, useCreateSessionFiltersFieldsStore } from '../store/create-session-filters-fields.store';

const LIMIT_RESULTS_FIELDS = 10;

export const useGetAllFieldsByFilter = () => {
  const filters = useCreateSessionFiltersFieldsStore(state => state.filters);
  const cleanedFilters = useMemo(() => filterObjectEntries(filters), [filters]);

  const userLocation = useUserLocationStore(state => state.location);

  const params = useMemo(() => {
    const { date: filterDate, ...restFilters } = (cleanedFilters as FiltersProps) || {};
    const dateValue = filterDate?.date;

    return {
      date: dateValue,
      limit: LIMIT_RESULTS_FIELDS,
      ...(userLocation && {
        userLat: userLocation.latitude,
        userLon: userLocation.longitude,
      }),
      ...restFilters,
    };
  }, [cleanedFilters, userLocation]);

  const { data, error, isError, ...rest } = useGetFields(params);

  useGetMethodErrorTracking({ error, extra: { context: 'useGetAllFieldsByFilter', params }, isError });

  const items = useMemo(() => data?.pages.flatMap(page => page.data.items) ?? [], [data]);
  const totalCount = data?.pages[0]?.data.totalCount ?? 0;

  return { error, isError, items, totalCount, ...rest };
};
