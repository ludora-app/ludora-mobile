import { useMemo } from 'react';
import { useUsersFindAllCompatibleUsersInfinite } from '@generatedApi/users/users.api';

import { PreparedSessionValues } from '@/utils/prepared-session.utils';
import { UsersFindAllCompatibleUsersParams } from '@/api/generated/model';
import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';

const COMPATIBLE_PLAYERS_LIMIT = 10;

/**
 * The players compatible with a prepared session, before or after it is published:
 * with the published session's uid, its players and already invited players are excluded.
 */
export const useGetCompatiblePlayers = ({
  fieldUid,
  preparedSession,
  sessionUid,
}: {
  fieldUid?: string;
  preparedSession: PreparedSessionValues | null;
  sessionUid?: string | null;
}) => {
  const params = useMemo<UsersFindAllCompatibleUsersParams>(
    () => ({
      fieldUid: fieldUid ?? '',
      gameMode: preparedSession?.gameMode,
      level: preparedSession?.level ?? 0,
      limit: COMPATIBLE_PLAYERS_LIMIT,
      sport: preparedSession?.sport ?? 'FOOTBALL',
      startDate: preparedSession?.startDate.toISOString() ?? '',
      ...(sessionUid && { sessionUid }),
    }),
    [fieldUid, preparedSession, sessionUid],
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
