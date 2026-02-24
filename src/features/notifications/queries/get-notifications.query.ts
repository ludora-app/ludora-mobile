import { useNotificationsFindAllInfinite } from '@generatedApi/notifications/notifications.api';

import { NotificationsFindAllParams } from '@/api/generated/model';

export const useGetNotificationsMe = (filters: NotificationsFindAllParams) =>
  useNotificationsFindAllInfinite(filters, {
    query: {
      getNextPageParam: lastPage => lastPage?.data?.nextCursor,
    },
  });
