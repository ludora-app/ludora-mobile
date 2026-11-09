import { useMemo } from 'react';
import { useSessionsFindRecommendedInfinite } from '@generatedApi/sessions/sessions.api';

import { SessionsFindRecommendedParams } from '@/api/generated/model';
import { useUserLocationStore } from '@/stores/user-geolocalisation.store';
import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';

import { HOME_RECOMMENDED_LIMIT } from '../constants/home.constants';

/**
 * The sessions recommended to the player (sport, level, format, availabilities, play area), first page only:
 * the featured suggestions and the "Pour toi" badges. Not fetched without any sport preference.
 * TODO(SCRUM-713): sorted by date until the backend ranks them by match.
 */
export const useGetHomeRecommendedSessions = ({ isEnabled }: { isEnabled: boolean }) => {
  const userLocation = useUserLocationStore(state => state.location);

  const params = useMemo<SessionsFindRecommendedParams>(
    () => ({
      limit: HOME_RECOMMENDED_LIMIT,
      ...(userLocation && { userLat: userLocation.latitude, userLon: userLocation.longitude }),
    }),
    [userLocation],
  );

  const { data, error, isError, isLoading, ...rest } = useSessionsFindRecommendedInfinite(params, {
    query: { enabled: isEnabled, getNextPageParam: lastPage => lastPage?.data?.nextCursor },
  });

  useGetMethodErrorTracking({ error, extra: { context: 'useGetHomeRecommendedSessions' }, isError });

  const recommendedSessions = useMemo(() => data?.pages[0]?.data.items ?? [], [data]);
  const recommendedUids = useMemo(() => new Set(recommendedSessions.map(({ uid }) => uid)), [recommendedSessions]);

  // A failed query reads as "nothing recommended", so the prepared session takes the place
  const isSettled = isEnabled && (!!data || isError);

  return {
    isError,
    isLoading,
    isSettled,
    recommendedSessions,
    recommendedUids,
    ...rest,
  };
};
