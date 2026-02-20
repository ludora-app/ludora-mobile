import { useConversationsFindByUserUids } from '@generatedApi/conversations/conversations.api';

export const useGetChatRoomConvIdByUserId = (userUid: string) => {
  const query = useConversationsFindByUserUids(userUid, {
    query: {
      enabled: !!userUid,
    },
  });

  const { data } = query.data || {};

  return {
    ...query,
    data,
  };
};
