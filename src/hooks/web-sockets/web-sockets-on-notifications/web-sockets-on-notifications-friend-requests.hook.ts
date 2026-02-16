import {
  useInvalidateNotificationsFindAll,
  useInvalidateNotificationsGetUnreadCount,
} from '@/api/generated/invalidate-queries';

export const useWebsocketOnNotificationsFriendRequests = () => {
  const invalideNotificationAll = useInvalidateNotificationsFindAll();
  const invalidateUnreadNotification = useInvalidateNotificationsGetUnreadCount();

  const handleNotificationFriendRequests = () => {
    invalideNotificationAll();
    invalidateUnreadNotification();
  };

  return handleNotificationFriendRequests;
};
