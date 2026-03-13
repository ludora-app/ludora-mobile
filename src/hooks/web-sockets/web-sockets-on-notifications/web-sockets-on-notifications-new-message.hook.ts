import { useChatStore } from '@/features/chat/store/chat.store';
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

    await invalidateConversationsFindAllByUserUid();
    invaliteConversationHasUnreadMessages();
    invalidateMessagesFindAllByChatroomId(conversationUid);

    // Scroll the conversation list to the top after the refetch
    setTimeout(() => {
      useChatStore.getState().scrollToTop?.();
    }, 100);
  };

  return handleNotificationNewMessage;
};
