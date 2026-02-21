import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { getConversationsLoadMoreMessagesQueryKey } from '@generatedApi/conversations/conversations.api';

import { useInvalidateConversationsFindAllByUserUid } from '@/api/generated/invalidate-queries';
import {
  MessageCollectionItemDtoGlobalStatus,
  PaginationResponseMessageCollectionItemDto,
} from '@/api/generated/model';

type MessagesInfiniteData = InfiniteData<PaginationResponseMessageCollectionItemDto>;

type TWebSocketMessageMessageDeleted = {
  conversationUid: string;
  messageUid: string;
};

export const useWebsocketOnNotificationsMessageDeleted = () => {
  const queryClient = useQueryClient();
  const invalidateConversationsFindAllByUserUid = useInvalidateConversationsFindAllByUserUid();

  const handleNotificationMessageDeleted = (notification: TWebSocketMessageMessageDeleted) => {
    const { conversationUid, messageUid } = notification || {};
    if (!conversationUid || !messageUid) return;

    // Invalidate conversation list so that the last message preview updates
    invalidateConversationsFindAllByUserUid();

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
            if (msg.uid === messageUid) {
              return {
                ...msg,
                globalStatus: MessageCollectionItemDtoGlobalStatus.DELETED,
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

  return handleNotificationMessageDeleted;
};
