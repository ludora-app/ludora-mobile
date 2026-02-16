import { TWebSocketMessage, WS_TYPES } from '@/types/websocket.type';

import { useWebsocketOnNotificationsFriendRequests } from './web-sockets-on-notifications-friend-requests.hook';
import { useWebsocketOnNotificationsFriendAccepted } from './web-sockets-on-notifications-friend-accepted.hook';
import { useWebsocketOnNotificationsSessionInvitation } from './web-sockets-on-notifications-session-invitation.hook';

export const useWebsocketOnNotifications = () => {
  const handleNotificationFriendRequests = useWebsocketOnNotificationsFriendRequests();
  const handleNotificationFriendAccepted = useWebsocketOnNotificationsFriendAccepted();
  const handleNotificationSessionInvitation = useWebsocketOnNotificationsSessionInvitation();

  const handleWSMessage = (notification: TWebSocketMessage) => {
    switch (notification?.type) {
      case WS_TYPES.FRIEND_REQUEST:
        handleNotificationFriendRequests();
        break;
      case WS_TYPES.FRIEND_ACCEPTED:
        handleNotificationFriendAccepted(notification.data);
        break;
      case WS_TYPES.SESSION_INVITATION:
        handleNotificationSessionInvitation();
        break;
      default:
        break;
    }
  };

  return handleWSMessage;
};
