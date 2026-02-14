import { useNotificationsFindAllInfinite } from '@generatedApi/notifications/notifications.api';

import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';

export const useGetNotificationsMe = () => {
  const { data, error, isError, ...rest } = useNotificationsFindAllInfinite({
    query: {
      getNextPageParam: lastPage => lastPage?.data?.nextCursor,
    },
  });

  useGetMethodErrorTracking({ error, isError });

  const items = data?.pages.flatMap(page => page.data.items) ?? [];

  return { ...rest, items };
};
