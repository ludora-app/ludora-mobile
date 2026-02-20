import { TWebSocketMessage, WS_TYPES } from '@/types/websocket.type';

import { useWebsocketOnNotificationsNewMessage } from './web-sockets-on-notifications-new-message.hook';
import { useWebsocketOnNotificationsFriendRequests } from './web-sockets-on-notifications-friend-requests.hook';
import { useWebsocketOnNotificationsFriendAccepted } from './web-sockets-on-notifications-friend-accepted.hook';
import { useWebsocketOnNotificationsSessionInvitation } from './web-sockets-on-notifications-session-invitation.hook';

export const useWebsocketOnNotifications = () => {
  const handleNotificationFriendRequests = useWebsocketOnNotificationsFriendRequests();
  const handleNotificationFriendAccepted = useWebsocketOnNotificationsFriendAccepted();
  const handleNotificationSessionInvitation = useWebsocketOnNotificationsSessionInvitation();
  const handleNotificationNewMessage = useWebsocketOnNotificationsNewMessage();

  const handleWSMessage = (notification: TWebSocketMessage) => {
    const { data: webSocketData, type: webSocketType } = notification || {};
    switch (webSocketType) {
      case WS_TYPES.FRIEND_REQUEST:
        handleNotificationFriendRequests();
        break;
      case WS_TYPES.FRIEND_ACCEPTED:
        handleNotificationFriendAccepted(webSocketData);
        break;
      case WS_TYPES.SESSION_INVITATION:
        handleNotificationSessionInvitation();
        break;
      case WS_TYPES.NEW_MESSAGE:
        // case WS_TYPES.MESSAGES_READ:
        handleNotificationNewMessage(webSocketData);
        break;
      default:
        break;
    }
  };

  return handleWSMessage;
};
