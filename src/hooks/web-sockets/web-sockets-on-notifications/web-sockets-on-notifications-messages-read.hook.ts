import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { getConversationsLoadMoreMessagesQueryKey } from '@generatedApi/conversations/conversations.api';

import { PaginationResponseMessageCollectionItemDto } from '@/api/generated/model';

type MessagesInfiniteData = InfiniteData<PaginationResponseMessageCollectionItemDto>;

type TWebSocketMessageMessagesRead = {
  conversationUid: string;
  messages?: {
    uid: string;
    hasAnyRead: boolean;
    hasEveryoneRead: boolean;
  }[];
};

export const useWebsocketOnNotificationsMessagesRead = () => {
  const queryClient = useQueryClient();
  // const invalidateConversationsFindAllByUserUid = useInvalidateConversationsFindAllByUserUid();

  const handleNotificationMessagesRead = (notification: TWebSocketMessageMessagesRead) => {
    const { conversationUid, messages } = notification || {};
    if (!conversationUid) return;

    // invalidateConversationsFindAllByUserUid();

    const queryKey = getConversationsLoadMoreMessagesQueryKey(conversationUid, {
      limit: 10,
    });

    queryClient.setQueryData<MessagesInfiniteData>(queryKey, oldData => {
      if (!oldData || !oldData.pages || oldData.pages.length === 0) return oldData;

      const updatedPages = oldData.pages.map(page => ({
        ...page,
        data: {
          ...page.data,
          items: page.data.items.map(msg => {
            const updateInfo = messages?.find(u => u.uid === msg.uid);

            if (updateInfo) {
              return {
                ...msg,
                hasAnyRead: updateInfo.hasAnyRead,
                hasEveryoneRead: updateInfo.hasEveryoneRead,
              };
            }
            return msg;
          }),
        },
      }));

      return {
        ...oldData,
        pages: updatedPages,
      };
    });
  };

  return handleNotificationMessagesRead;
};
