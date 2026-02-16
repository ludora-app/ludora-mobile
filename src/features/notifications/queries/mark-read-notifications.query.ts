import { useNotificationsMarkAllAsRead } from '@generatedApi/notifications/notifications.api';

import {
  useInvalidateNotificationsFindAll,
  useInvalidateNotificationsGetUnreadCount,
} from '@/api/generated/invalidate-queries';

export const useMarkReadNotifications = () => {
  const invalidateNotifications = useInvalidateNotificationsFindAll();
  const invalidateUnreadCount = useInvalidateNotificationsGetUnreadCount();
  const mutation = useNotificationsMarkAllAsRead({
    mutation: {
      onSuccess: () => {
        invalidateNotifications();
        invalidateUnreadCount();
      },
    },
  });

  const mutateAsync = () => mutation.mutateAsync();

  return {
    ...mutation,
    mutateAsync,
  };
};
