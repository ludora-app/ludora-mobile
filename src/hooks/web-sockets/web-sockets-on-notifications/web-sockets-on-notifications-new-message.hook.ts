import {
  useInvalidateConversationsFindAllByUserUid,
  useInvalidateConversationsHasUnreadMessages,
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
  const invaliteConversationHasUnreadMessages = useInvalidateConversationsHasUnreadMessages();

  const handleNotificationNewMessage = async (notification: TWebSocketMessageNewMessage) => {
    const { conversationUid } = notification || {};

    invalidateConversationsFindAllByUserUid();
    invaliteConversationHasUnreadMessages();
    invalidateMessagesFindAllByChatroomId(conversationUid);
  };

  return handleNotificationNewMessage;
};
