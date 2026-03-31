import { useMemo } from 'react';
import { useSessionsFindAllByUserUidInfinite } from '@generatedApi/sessions/sessions.api';

import { SessionsFindAllByUserUidParams } from '@/api/generated/model';
import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';

const LIMIT = 10;
export const useGetSessionsByUserId = (userId: string) => {
  const filter: SessionsFindAllByUserUidParams = {
    limit: LIMIT,
    startDateSortOrder: 'desc',
    visibility: 'PUBLIC',
  };

  const { data, error, isError, ...rest } = useSessionsFindAllByUserUidInfinite(userId, filter, {
    query: {
      enabled: !!userId,
      getNextPageParam: lastPage => lastPage?.data?.nextCursor,
    },
  });

  const items = useMemo(() => data?.pages.flatMap(page => page.data.items) ?? [], [data]);

  useGetMethodErrorTracking({ error, isError });

  return { ...rest, items };
};
