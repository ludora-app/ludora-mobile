import { useNotificationsFindAllInfinite } from '@generatedApi/notifications/notifications.api';

import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';

import { useNotificationsFilterStore } from '../stores/notifications-filter.store';

export const useGetNotificationsMe = () => {
  const filters = useNotificationsFilterStore(state => state.filters);

  const { data, error, isError, ...rest } = useNotificationsFindAllInfinite({
    query: {
      getNextPageParam: lastPage => lastPage?.data?.nextCursor,
    },
  });

  useGetMethodErrorTracking({ error, isError });

  const items = data?.pages.flatMap(page => page.data.items) ?? [];

  return { ...rest, items };
};
