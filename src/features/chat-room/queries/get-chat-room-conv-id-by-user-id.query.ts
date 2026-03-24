import { useConversationsFindByUserUids } from '@generatedApi/conversations/conversations.api';

import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';

export const useGetChatRoomConvIdByUserId = (userUid: string) => {
  const query = useConversationsFindByUserUids(userUid, {
    query: {
      enabled: !!userUid,
    },
  });

  const { data } = query.data || {};

  const { error, isError } = query || {};

  useGetMethodErrorTracking({
    error,
    extra: { context: 'useGetChatRoomConvIdByUserId' },
    isError,
  });

  return {
    ...query,
    data,
  };
};
