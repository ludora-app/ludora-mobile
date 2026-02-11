import { ConversationsFindAllByUserUidParams } from '@/api/generated/model';
import { useConversationsFindAllByUserUidInfinite } from '@/api/generated/api/conversations/conversations.api';

export const useGetAllChatRooms = (filter: ConversationsFindAllByUserUidParams) =>
  useConversationsFindAllByUserUidInfinite(filter, {
    query: {
      getNextPageParam: lastPage => lastPage?.data?.nextCursor,
    },
  });
