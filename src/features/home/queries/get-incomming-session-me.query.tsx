import { useSessionsFindAllByUserUidInfinite } from '@generatedApi/sessions/sessions.api';

export const useGetIncommingSessionMe = () => {
  const { data, ...rest } = useSessionsFindAllByUserUidInfinite(
    {
      limit: 1,
      scope: 'UPCOMING',
      startDateSortOrder: 'desc',
    },
    {
      query: {
        getNextPageParam: lastPage => lastPage?.data?.nextCursor,
      },
    },
  );
  const items = data?.pages.flatMap(page => page.data.items) ?? [];
  const item = items.length > 0 ? items[0] : null;

  return { data: item, ...rest };
};
