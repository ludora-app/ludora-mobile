import { useConversationsFindOne } from '@generatedApi/conversations/conversations.api';

import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';

export const useGetChatRoomById = ({ convId, enabled }: { convId: string; enabled: boolean }) => {
  const query = useConversationsFindOne(convId, {
    query: {
      enabled,
    },
  });

  const { data } = query?.data || {};
  const { error, isError } = query || {};

  useGetMethodErrorTracking({
    error,
    extra: { context: 'useGetChatRoomById' },
    isError,
  });

  return {
    ...query,
    data,
  };
};
