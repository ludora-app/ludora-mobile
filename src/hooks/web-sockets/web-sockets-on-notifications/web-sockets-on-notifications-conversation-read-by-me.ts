import {
  useInvalidateConversationsFindAllByUserUid,
  useInvalidateConversationsHasUnreadMessages,
} from '@/api/generated/invalidate-queries';

export const useWebsocketOnNotificationsConversationReadByMe = () => {
  const invalidateConversationsFindAllByUserUid = useInvalidateConversationsFindAllByUserUid();
  const invaliteConversationHasUnreadMessages = useInvalidateConversationsHasUnreadMessages();

  const handleNotificationConversationReadByMe = () => {
    invalidateConversationsFindAllByUserUid();
    invaliteConversationHasUnreadMessages();
  };

  return handleNotificationConversationReadByMe;
};
