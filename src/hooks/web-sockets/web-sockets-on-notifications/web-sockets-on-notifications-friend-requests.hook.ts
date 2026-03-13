import {
  useInvalidateFriendsFindMyFriendRequest,
  useInvalidateNotificationsFindAll,
  useInvalidateNotificationsGetUnreadCount,
  useInvalidateUsersFindAll,
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
  const invalidateUserFriendRequest = useInvalidateFriendsFindMyFriendRequest();

  const handleNotificationFriendRequests = (notification: FriendRequestData) => {
    invalideNotificationAll();
    invalidateUnreadNotification();
    invalidateUsersFindAll();
    invalidateUserFriendRequest(notification.senderUid);
  };

  return handleNotificationFriendRequests;
};
