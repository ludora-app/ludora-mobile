import { useMemo } from 'react';

import { filterObjectEntries } from '@/utils/filters.utils';
import { SessionsFindAllParams } from '@/api/generated/model';
import { useUserLocationStore } from '@/stores/user-geolocalisation.store';
import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';

import { useGetAllSessions } from './get-sessions.query';
import { FiltersProps, useHomeSessionFiltersStore } from '../stores/home-sessions-filters.store';

const LIMIT_RESULTS_SESSIONS = 10;

export const useGetAllSessionsByFilter = () => {
  const sessionFilter = useHomeSessionFiltersStore(state => state.filters);
  const cleanedFilters = filterObjectEntries(sessionFilter);
  const { date: filterDate, ...restFilters } = (cleanedFilters as FiltersProps) || {};

  const userLocation = useUserLocationStore(state => state.location);

  const startDate = filterDate?.date;

  const params = useMemo(
    (): SessionsFindAllParams => ({
      limit: LIMIT_RESULTS_SESSIONS,
      ...(startDate && { startDate }),
      ...(userLocation && {
        userLat: userLocation.latitude,
        userLon: userLocation.longitude,
      }),
      ...restFilters,
    }),
    [startDate, userLocation, restFilters],
  );

  console.log(params);

  const { data, error, isError, ...rest } = useGetAllSessions(params);

  useGetMethodErrorTracking({ error, extra: { context: 'useGetAllSessionsByFilter' }, isError });

  const items = data?.pages.flatMap(page => page.data.items) ?? [];
  const totalCount = data?.pages[0]?.data.totalCount ?? 0;

  return { error, isError, items, totalCount, ...rest };
};
