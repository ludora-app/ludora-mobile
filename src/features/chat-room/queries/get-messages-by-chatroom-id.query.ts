import { useConversationsLoadMoreMessagesInfinite } from '@generatedApi/conversations/conversations.api';

import { ConversationsLoadMoreMessagesParams } from '@/api/generated/model';

import { useChatRoomStore } from '../store/chat-room.store';

const LIMIT_MESSAGES = 10;

export const useGetMessagesByChatroomId = () => {
  const chatRoomId = useChatRoomStore(state => state.chatRoomId);
  const filter: ConversationsLoadMoreMessagesParams = {
    limit: LIMIT_MESSAGES,
  };

  const { data, ...rest } = useConversationsLoadMoreMessagesInfinite(chatRoomId, filter, {
    query: {
      enabled: !!chatRoomId,
      getNextPageParam: lastPage => lastPage?.data?.nextCursor,
    },
  });

  const items = data?.pages ? [...data.pages].reverse().flatMap(page => page.data.items) : [];

  return { ...rest, items };
};
