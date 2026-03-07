import { QueryClient } from '@tanstack/react-query';

import { ConversationCollectionResponseData, MessageDto, UserSimpleDisplayWithUidData } from '@/api/generated/model';

import { useChatStore } from '../../../chat/store/chat.store';
import { CONVERSATIONS_LIST_QUERY_KEY, ConversationsInfiniteData } from './chat-room-message-queue.types';

export const updateConversationListCache = (
  queryClient: QueryClient,
  conversationUid: string,
  lastMessage: MessageDto,
  sender: UserSimpleDisplayWithUidData | null | undefined,
) => {
  queryClient.setQueriesData<ConversationsInfiniteData>({ queryKey: [CONVERSATIONS_LIST_QUERY_KEY] }, oldData => {
    if (!oldData || !oldData.pages || oldData.pages.length === 0) return oldData;

    let foundItem: ConversationCollectionResponseData | null = null;

    // Find and remove the conversation from its current position
    const updatedPages = oldData.pages.map(page => {
      const items = page.data.items.filter(item => {
        if (item.uid === conversationUid) {
          foundItem = item;
          return false;
        }
        return true;
      });
      return { ...page, data: { ...page.data, items } };
    });

    if (foundItem) {
      const updatedConversation: ConversationCollectionResponseData = {
        ...foundItem,
        lastMessage,
        sender: (sender as any) ?? (foundItem as any).sender,
      };

      // Insert at the beginning of the first page to move it to the top
      updatedPages[0].data = {
        ...updatedPages[0].data,
        items: [updatedConversation, ...updatedPages[0].data.items],
      };

      // Scroll the conversation list to the top so the user sees the moved conversation
      setTimeout(() => {
        useChatStore.getState().scrollToTop?.();
      }, 100);

      return { ...oldData, pages: updatedPages };
    }

    return oldData;
  });
};
