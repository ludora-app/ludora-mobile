import { useMemo } from 'react';
import { useSessionsFindRecommendedInfinite } from '@generatedApi/sessions/sessions.api';

import { SessionsFindRecommendedParams } from '@/api/generated/model';
import { useUserLocationStore } from '@/stores/user-geolocalisation.store';
import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';

import { ON_BOARDING_SESSIONS_MAX_SUGGESTIONS } from '../constants/on-boarding-sessions.constants';

export const useGetRecommendedSessions = () => {
  const userLocation = useUserLocationStore(state => state.location);

  const params = useMemo<SessionsFindRecommendedParams>(
    () => ({
      limit: ON_BOARDING_SESSIONS_MAX_SUGGESTIONS,
      ...(userLocation && { userLat: userLocation.latitude, userLon: userLocation.longitude }),
    }),
    [userLocation],
  );

  const { data, error, isError, ...rest } = useSessionsFindRecommendedInfinite(params, {
    query: {
      getNextPageParam: lastPage => lastPage?.data?.nextCursor,
    },
  });

  useGetMethodErrorTracking({ error, extra: { context: 'useGetRecommendedSessions' }, isError });

  const suggestions = useMemo(() => data?.pages[0]?.data.items ?? [], [data]);

  return { error, isError, suggestions, ...rest };
};
