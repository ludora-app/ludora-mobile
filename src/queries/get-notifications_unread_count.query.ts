import { useNotificationsGetUnreadCount } from '@generatedApi/notifications/notifications.api';

import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';

export const useNotificationsUnreadCount = () => {
  const query = useNotificationsGetUnreadCount();

  const { data } = query?.data || {};

  const { error, isError } = query || {};

  useGetMethodErrorTracking({
    error,
    extra: { context: 'useNotificationsUnreadCount' },
    isError,
  });

  return {
    ...query,
    data,
  };
};
