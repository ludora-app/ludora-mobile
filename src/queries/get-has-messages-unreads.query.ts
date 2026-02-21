import { useConversationsHasUnreadMessages } from '@generatedApi/conversations/conversations.api';

export const useMessagesUnread = () => {
  const query = useConversationsHasUnreadMessages();

  const { data } = query?.data || {};

  return {
    ...query,
    data,
  };
};
