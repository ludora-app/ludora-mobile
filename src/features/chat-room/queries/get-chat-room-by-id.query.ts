import { useConversationsFindOne } from '@generatedApi/conversations/conversations.api';

export const useGetChatRoomById = ({ convId, enabled }: { convId: string; enabled: boolean }) => {
  const query = useConversationsFindOne(convId, {
    query: {
      enabled,
    },
  });

  const { data } = query?.data || {};

  return {
    ...query,
    data,
  };
};
