import { useSessionsFindAllMySessionsInfinite } from '@generatedApi/sessions/sessions.api';

import { SessionsFindAllMySessionsParams } from '@/api/generated/model';
import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';

const LIMIT = 10;
export const useGetSessionsMe = (enabled: boolean) => {
  const filter: SessionsFindAllMySessionsParams = {
    limit: LIMIT,
    startDateSortOrder: 'desc',
  };
  const { data, error, isError, ...rest } = useSessionsFindAllMySessionsInfinite(filter, {
    query: {
      enabled,
      getNextPageParam: lastPage => lastPage?.data?.nextCursor,
    },
  });

  useGetMethodErrorTracking({ error, isError });

  const items = data?.pages.flatMap(page => page.data.items) ?? [];

  return { ...rest, items };
};
