import { useMemo } from 'react';
import { useSessionsFindAllInfinite } from '@generatedApi/sessions/sessions.api';

import { filterObjectEntries } from '@/utils/filters.utils';
import { SessionsFindAllParams } from '@/api/generated/model';
import { useUserLocationStore } from '@/stores/user-geolocalisation.store';
import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';

import { useHomeDate } from '../hooks/home-date.hook';
import { FiltersProps, useHomeSessionFiltersStore } from '../stores/home-sessions-filters.store';
import {
  HOME_SESSIONS_LIMIT,
  HOME_SESSIONS_WIDE_DISTANCE_KM,
  HOME_SESSIONS_DEFAULT_DISTANCE_KM,
} from '../constants/home.constants';

/** Distance of the list when the filters page sets none: 10 km, or 20 km once the area is widened. */
export const useGetHomeSessionsDistance = () => {
  const maxDistance = useHomeSessionFiltersStore(state => state.filters.maxDistance);
  const isAreaWidened = useHomeSessionFiltersStore(state => state.isAreaWidened);
  const defaultDistance = isAreaWidened ? HOME_SESSIONS_WIDE_DISTANCE_KM : HOME_SESSIONS_DEFAULT_DISTANCE_KM;

  return maxDistance ?? defaultDistance;
};

/** "Toutes les sessions": the upcoming sessions around the player, with the filters page values and the sport chip. */
export const useGetHomeSessions = () => {
  const sessionFilter = useHomeSessionFiltersStore(state => state.filters);
  const userLocation = useUserLocationStore(state => state.location);
  const maxDistance = useGetHomeSessionsDistance();
  const homeDate = useHomeDate();

  const params = useMemo<SessionsFindAllParams>(() => {
    const { date: filterDate, ...restFilters } = filterObjectEntries(sessionFilter) as FiltersProps;

    return {
      limit: HOME_SESSIONS_LIMIT,
      // From now unless the filters page sets a date: there is no day carousel any more
      startDate: filterDate?.source === 'filter' ? filterDate.date : homeDate.toISOString(),
      ...(userLocation && { userLat: userLocation.latitude, userLon: userLocation.longitude }),
      ...restFilters,
      maxDistance,
    };
  }, [homeDate, maxDistance, sessionFilter, userLocation]);

  const { data, error, isError, ...rest } = useSessionsFindAllInfinite(params, {
    query: { getNextPageParam: lastPage => lastPage?.data?.nextCursor },
  });

  useGetMethodErrorTracking({ error, extra: { context: 'useGetHomeSessions' }, isError });

  const items = useMemo(() => data?.pages.flatMap(page => page.data.items) ?? [], [data]);
  const totalCount = data?.pages[0]?.data.totalCount ?? 0;

  return { error, isError, items, totalCount, ...rest };
};
