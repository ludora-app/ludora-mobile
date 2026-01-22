import { useSessionsFindAllByUserUidInfinite } from '@generatedApi/sessions/sessions.api';

import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';

export const useGetIncommingSessionMe = () => {
  const { data, error, isError, ...rest } = useSessionsFindAllByUserUidInfinite(
    {
      limit: 1,
      scope: 'UPCOMING',
      startDateSortOrder: 'asc',
    },
    {
      query: {
        getNextPageParam: lastPage => lastPage?.data?.nextCursor,
      },
    },
  );

  useGetMethodErrorTracking({ error, extra: { context: 'useGetIncommingSessionMe' }, isError });

  const items = data?.pages.flatMap(page => page.data.items) ?? [];
  const item = items.length > 0 ? items[0] : null;

  return { data: item, error, isError, ...rest };
};
