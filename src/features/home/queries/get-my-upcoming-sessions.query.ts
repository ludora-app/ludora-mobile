import { useMemo } from 'react';
import { useSessionsFindAllMySessionsInfinite } from '@generatedApi/sessions/sessions.api';

import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';

import { HOME_MY_UPCOMING_LIMIT } from '../constants/home.constants';

/**
 * The player's upcoming sessions, joined or organised, the soonest first: the next match card,
 * and the "Tu es inscrit" badges of the list.
 * TODO(SCRUM-713): the badge reads `isJoined` on the list once the backend returns it.
 */
export const useGetMyUpcomingSessions = () => {
  const { data, error, isError, isLoading, ...rest } = useSessionsFindAllMySessionsInfinite(
    {
      limit: HOME_MY_UPCOMING_LIMIT,
      scope: 'UPCOMING',
      startDateSortOrder: 'asc',
    },
    { query: { getNextPageParam: lastPage => lastPage?.data?.nextCursor } },
  );

  useGetMethodErrorTracking({ error, extra: { context: 'useGetMyUpcomingSessions' }, isError });

  const sessions = useMemo(() => data?.pages[0]?.data.items ?? [], [data]);
  const joinedUids = useMemo(() => new Set(sessions.map(({ uid }) => uid)), [sessions]);

  return {
    isError,
    isLoading,
    joinedUids,
    nextMatch: sessions[0] ?? null,
    ...rest,
  };
};
