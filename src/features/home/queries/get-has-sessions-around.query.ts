import { useMemo, useState } from 'react';
import { useSessionsFindAllInfinite } from '@generatedApi/sessions/sessions.api';

import { SessionsFindAllParams } from '@/api/generated/model';
import { useUserLocationStore } from '@/stores/user-geolocalisation.store';
import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';

import { HOME_SESSIONS_DEFAULT_DISTANCE_KM } from '../constants/home.constants';

/**
 * Whether any upcoming session exists within the default distance, whatever the sport chip and the filters:
 * without any, the prepared session is announced as the first one around.
 */
export const useGetHasSessionsAround = ({ isEnabled }: { isEnabled: boolean }) => {
  const userLocation = useUserLocationStore(state => state.location);
  // Fixed at mount: a new start date on each render would make a new query
  const [startDate] = useState(() => new Date().toISOString());

  const params = useMemo<SessionsFindAllParams>(
    () => ({
      limit: 1,
      maxDistance: HOME_SESSIONS_DEFAULT_DISTANCE_KM,
      startDate,
      ...(userLocation && { userLat: userLocation.latitude, userLon: userLocation.longitude }),
    }),
    [startDate, userLocation],
  );

  const { data, error, isError, isLoading, ...rest } = useSessionsFindAllInfinite(params, {
    query: { enabled: isEnabled, getNextPageParam: lastPage => lastPage?.data?.nextCursor },
  });

  useGetMethodErrorTracking({ error, extra: { context: 'useGetHasSessionsAround' }, isError });

  const items = data?.pages[0]?.data.items;
  // Undefined while unknown. A failed count must not block the header: it then reads as "sessions exist"
  let hasSessionsAround: boolean | undefined;
  if (isError) hasSessionsAround = true;
  else if (items) hasSessionsAround = items.length > 0;

  return { hasSessionsAround, isLoading, ...rest };
};
