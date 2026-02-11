import { useSessionsFindAllMeInfinite } from '@generatedApi/sessions/sessions.api';

import { SessionsFindAllMeParams } from '@/api/generated/model';
import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';

const LIMIT = 10;
export const useGetSessionsMe = (enabled: boolean) => {
  const filter: SessionsFindAllMeParams = {
    limit: LIMIT,
    startDateSortOrder: 'desc',
  };
  const { data, error, isError, ...rest } = useSessionsFindAllMeInfinite(filter, {
    query: {
      enabled,
      getNextPageParam: lastPage => lastPage?.data?.nextCursor,
    },
  });

  useGetMethodErrorTracking({ error, isError });

  const items = data?.pages.flatMap(page => page.data.items) ?? [];

  return { ...rest, items };
};
