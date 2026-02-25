import { TWebSocketMessage, WS_TYPES } from '@/types/websocket.type';

import { useWebsocketOnNotificationsNewMessage } from './web-sockets-on-notifications-new-message.hook';
import { useWebsocketOnNotificationsMessagesRead } from './web-sockets-on-notifications-messages-read.hook';
import { useWebsocketOnNotificationsMessageDeleted } from './web-sockets-on-notifications-message-deleted.hook';
import { useWebsocketOnNotificationsFriendRequests } from './web-sockets-on-notifications-friend-requests.hook';
import { useWebsocketOnNotificationsFriendAccepted } from './web-sockets-on-notifications-friend-accepted.hook';
import { useWebsocketOnNotificationsSessionInvitation } from './web-sockets-on-notifications-session-invitation.hook';
import { useWebsocketOnNotificationsConversationReadByMe } from './web-sockets-on-notifications-conversation-read-by-me';

export const useWebsocketOnNotifications = () => {
  const handleNotificationFriendRequests = useWebsocketOnNotificationsFriendRequests();
  const handleNotificationFriendAccepted = useWebsocketOnNotificationsFriendAccepted();
  const handleNotificationSessionInvitation = useWebsocketOnNotificationsSessionInvitation();
  const handleNotificationNewMessage = useWebsocketOnNotificationsNewMessage();
  const handleNotificationConversationReadByMe = useWebsocketOnNotificationsConversationReadByMe();
  const handleNotificationMessagesRead = useWebsocketOnNotificationsMessagesRead();
  const handleNotificationMessageDeleted = useWebsocketOnNotificationsMessageDeleted();

  const handleWSMessage = (notification: TWebSocketMessage) => {
    const { data: webSocketData, type: webSocketType } = notification || {};
    switch (webSocketType) {
      case WS_TYPES.FRIEND_REQUEST:
        handleNotificationFriendRequests(webSocketData);
        break;
      case WS_TYPES.FRIEND_ACCEPTED:
        handleNotificationFriendAccepted(webSocketData);
        break;
      case WS_TYPES.SESSION_INVITATION:
        handleNotificationSessionInvitation();
        break;
      case WS_TYPES.NEW_MESSAGE:
        handleNotificationNewMessage(webSocketData);
        break;
      case WS_TYPES.MESSAGES_READ:
        handleNotificationMessagesRead(webSocketData);
        break;
      case WS_TYPES.MESSAGE_DELETED:
        handleNotificationMessageDeleted(webSocketData);
        break;
      case WS_TYPES.CONVERSATION_READ:
        handleNotificationConversationReadByMe();
        break;
      default:
        break;
    }
  };

  return handleWSMessage;
};
