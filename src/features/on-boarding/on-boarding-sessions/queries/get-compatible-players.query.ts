import { useMemo } from 'react';
import { useUsersFindAllCompatibleUsersInfinite } from '@generatedApi/users/users.api';

import { UsersFindAllCompatibleUsersParams } from '@/api/generated/model';
import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';

import { PreparedSessionValues } from '../utils/prepared-session.utils';
import { useOnBoardingSessionsStore } from '../../stores/on-boarding-sessions.store';

const COMPATIBLE_PLAYERS_LIMIT = 10;

/**
 * The players compatible with the prepared session, before or after it is published:
 * once published, its players and already invited players are excluded.
 */
export const useGetCompatiblePlayers = ({
  fieldUid,
  preparedSession,
}: {
  fieldUid?: string;
  preparedSession: PreparedSessionValues | null;
}) => {
  const publishedSessionUid = useOnBoardingSessionsStore(state => state.publishedSessionUid);

  const params = useMemo<UsersFindAllCompatibleUsersParams>(
    () => ({
      fieldUid: fieldUid ?? '',
      gameMode: preparedSession?.gameMode,
      level: preparedSession?.level ?? 0,
      limit: COMPATIBLE_PLAYERS_LIMIT,
      sport: preparedSession?.sport ?? 'FOOTBALL',
      startDate: preparedSession?.startDate.toISOString() ?? '',
      ...(publishedSessionUid && { sessionUid: publishedSessionUid }),
    }),
    [fieldUid, preparedSession, publishedSessionUid],
  );

  const { data, error, isError, ...rest } = useUsersFindAllCompatibleUsersInfinite(params, {
    query: {
      enabled: !!fieldUid && !!preparedSession,
      getNextPageParam: lastPage => lastPage?.data?.nextCursor,
    },
  });

  useGetMethodErrorTracking({ error, extra: { context: 'useGetCompatiblePlayers' }, isError });

  const players = useMemo(() => data?.pages.flatMap(page => page?.data?.items ?? []) ?? [], [data]);
  const totalCount = data?.pages[0]?.data?.totalCount ?? 0;

  return { isError, players, totalCount, ...rest };
};
