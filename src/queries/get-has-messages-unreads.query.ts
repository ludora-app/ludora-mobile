import { useConversationsHasUnreadMessages } from '@generatedApi/conversations/conversations.api';

import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';

export const useMessagesUnread = () => {
  const query = useConversationsHasUnreadMessages();

  const { data } = query?.data || {};

  const { error, isError } = query || {};

  useGetMethodErrorTracking({
    error,
    extra: { context: 'useMessagesUnread' },
    isError,
  });

  return {
    ...query,
    data,
  };
};
