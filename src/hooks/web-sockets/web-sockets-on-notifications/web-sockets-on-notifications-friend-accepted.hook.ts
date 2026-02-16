import {
  useInvalidateFriendsFindMyFriendRequest,
  useInvalidateNotificationsFindAll,
  useInvalidateNotificationsGetUnreadCount,
  useInvalidateUsersFindMe,
  useInvalidateUsersFindOne,
} from '@/api/generated/invalidate-queries';

type FriendRequestData = {
  actionUrl: string;
  senderName: string;
  senderUid: string;
};

export const useWebsocketOnNotificationsFriendAccepted = () => {
  const invalideNotificationAll = useInvalidateNotificationsFindAll();
  const invalidateUnreadNotification = useInvalidateNotificationsGetUnreadCount();
  const invalidateUserMe = useInvalidateUsersFindMe();
  const invalidateFriendRequest = useInvalidateFriendsFindMyFriendRequest();
  const invalideUserByUid = useInvalidateUsersFindOne();

  const handleNotificationFriendAccepted = (notification: FriendRequestData) => {
    invalideNotificationAll();
    invalidateUnreadNotification();
    invalidateUserMe();
    invalidateFriendRequest(notification?.senderUid || '');
    invalideUserByUid(notification?.senderUid || '');
  };

  return handleNotificationFriendAccepted;
};
