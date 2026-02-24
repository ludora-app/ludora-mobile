import {
  useInvalidateNotificationsFindAll,
  useInvalidateNotificationsGetUnreadCount,
  useInvalidateUsersFindAll,
  useInvalidateUsersFindOne,
} from '@/api/generated/invalidate-queries';

type FriendRequestData = {
  actionUrl: string;
  senderName: string;
  senderUid: string;
};

export const useWebsocketOnNotificationsFriendRequests = () => {
  const invalideNotificationAll = useInvalidateNotificationsFindAll();
  const invalidateUnreadNotification = useInvalidateNotificationsGetUnreadCount();
  const invalidateUsersFindAll = useInvalidateUsersFindAll();
  const invalidateUsersFindOne = useInvalidateUsersFindOne();

  const handleNotificationFriendRequests = (notification: FriendRequestData) => {
    invalideNotificationAll();
    invalidateUnreadNotification();
    invalidateUsersFindAll();
    invalidateUsersFindOne(notification.senderUid);
  };

  return handleNotificationFriendRequests;
};
