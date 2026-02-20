import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { getConversationsLoadMoreMessagesQueryKey } from '@generatedApi/conversations/conversations.api';

import { PaginationResponseMessageCollectionItemDto } from '@/api/generated/model';
import { useChatRoomOptimisticMessagesStore } from '@/features/chat-room/store/chat-room-optimistic-messages.store';
import {
  useInvalidateConversationsFindAllByUserUid,
  useInvalidateConversationsLoadMoreMessages,
} from '@/api/generated/invalidate-queries';

type MessagesInfiniteData = InfiniteData<PaginationResponseMessageCollectionItemDto>;

type TWebSocketMessageNewMessage = {
  conversationUid: string;
  messagePreview: string;
  senderUid: string;
  actionUrl: string;
};

export const useWebsocketOnNotificationsNewMessage = () => {
  const invalidateConversationsFindAllByUserUid = useInvalidateConversationsFindAllByUserUid();
  const invalidateMessagesFindAllByChatroomId = useInvalidateConversationsLoadMoreMessages();
  const getPendingMessages = useChatRoomOptimisticMessagesStore(store => store.getPendingMessages);
  const hasPendingMessage = useChatRoomOptimisticMessagesStore(store => store.hasPendingMessage);
  const queryClient = useQueryClient();

  const handleNotificationNewMessage = async (notification: TWebSocketMessageNewMessage) => {
    // Save pending optimistic messages before invalidation
    const optimisticMessages = getPendingMessages();

    invalidateConversationsFindAllByUserUid({});
    invalidateConversationsFindAllByUserUid({ type: 'PRIVATE' });

    // Invalidate and wait for the refetch to complete
    await invalidateMessagesFindAllByChatroomId(notification.conversationUid);

    // Re-merge pending optimistic messages back into the cache if any are still pending
    if (optimisticMessages.length > 0) {
      const queryKey = getConversationsLoadMoreMessagesQueryKey(notification.conversationUid, {
        limit: 10,
      });

      queryClient.setQueryData<MessagesInfiniteData>(queryKey, oldData => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) return oldData;

        // Filter to only messages that are still pending (haven't been confirmed yet)
        const stillPending = optimisticMessages.filter(msg => hasPendingMessage(msg.uid));
        if (stillPending.length === 0) return oldData;

        // Filter out any optimistic messages that might already be in the refetched data
        const existingUids = new Set(oldData.pages.flatMap(page => page.data.items.map(item => item.uid)));
        const toReAdd = stillPending.filter(msg => !existingUids.has(msg.uid));
        if (toReAdd.length === 0) return oldData;

        const updatedPages = [...oldData.pages];
        const firstPage = updatedPages[0];

        const mergedItems = [...firstPage.data.items, ...toReAdd].sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );

        updatedPages[0] = {
          ...firstPage,
          data: {
            ...firstPage.data,
            items: mergedItems,
          },
        };

        return {
          ...oldData,
          pages: updatedPages,
        };
      });
    }
  };

  return handleNotificationNewMessage;
};
