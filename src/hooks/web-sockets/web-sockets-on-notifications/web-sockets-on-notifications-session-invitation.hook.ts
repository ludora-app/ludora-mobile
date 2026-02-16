import {
  useInvalidateNotificationsFindAll,
  useInvalidateNotificationsGetUnreadCount,
} from '@/api/generated/invalidate-queries';

export const useWebsocketOnNotificationsSessionInvitation = () => {
  const invalideNotificationAll = useInvalidateNotificationsFindAll();
  const invalidateUnreadNotification = useInvalidateNotificationsGetUnreadCount();

  const handleNotificationSessionInvitation = () => {
    invalideNotificationAll();
    invalidateUnreadNotification();
  };

  return handleNotificationSessionInvitation;
};
