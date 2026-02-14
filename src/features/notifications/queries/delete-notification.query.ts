import { useNotificationsDeleteNotification } from '@generatedApi/notifications/notifications.api';

import { useInvalidateNotificationsFindAll } from '@/api/generated/invalidate-queries';

export const useDeleteNotification = (notificationUid: string) => {
  const invalidateNotifications = useInvalidateNotificationsFindAll();
  const mutation = useNotificationsDeleteNotification({
    mutation: {
      onSuccess: () => invalidateNotifications(),
    },
  });

  const mutateAsync = () => mutation.mutateAsync({ uid: notificationUid });

  return {
    ...mutation,
    mutateAsync,
  };
};
