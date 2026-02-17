import {
  useInvalidateConversationsFindAllByUserUid,
  useInvalidateConversationsLoadMoreMessages,
} from '@/api/generated/invalidate-queries';

type TWebSocketMessageNewMessage = {
  conversationUid: string;
  messagePreview: string;
  senderUid: string;
  actionUrl: string;
};

export const useWebsocketOnNotificationsNewMessage = () => {
  const invalidateConversationsFindAllByUserUid = useInvalidateConversationsFindAllByUserUid();
  const invalidateMessagesFindAllByChatroomId = useInvalidateConversationsLoadMoreMessages();

  const handleNotificationNewMessage = (notification: TWebSocketMessageNewMessage) => {
    invalidateConversationsFindAllByUserUid({});
    invalidateConversationsFindAllByUserUid({ type: 'PRIVATE' });
    invalidateMessagesFindAllByChatroomId(notification.conversationUid);
  };

  return handleNotificationNewMessage;
};
