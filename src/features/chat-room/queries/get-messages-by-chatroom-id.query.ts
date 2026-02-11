import { useConversationsLoadMoreMessagesInfinite } from '@generatedApi/conversations/conversations.api';

import { ConversationsLoadMoreMessagesParams } from '@/api/generated/model';

const LIMIT_MESSAGES = 10;

export const useGetMessagesByChatroomId = (chatRoomId: string) => {
  const filter: ConversationsLoadMoreMessagesParams = {
    limit: LIMIT_MESSAGES,
  };

  const { data, ...rest } = useConversationsLoadMoreMessagesInfinite(chatRoomId, filter, {
    query: {
      getNextPageParam: lastPage => lastPage?.data?.nextCursor,
    },
  });

  const items = data?.pages.flatMap(page => page.data.items) ?? [];

  return { ...rest, items };
};
