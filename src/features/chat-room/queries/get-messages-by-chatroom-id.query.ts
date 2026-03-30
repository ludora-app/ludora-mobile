import { useEffect, useMemo } from 'react';
import { useConversationsLoadMoreMessagesInfinite } from '@generatedApi/conversations/conversations.api';

import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';
import { ConversationsLoadMoreMessagesParams } from '@/api/generated/model';

import { useChatRoomStore } from '../context/chat-room-store-context';
import { useChatRoomOptimisticMessagesStore } from '../store/chat-room-optimistic-messages.store';

const LIMIT_MESSAGES = 10;

export const useGetMessagesByChatroomId = () => {
  const chatRoomId = useChatRoomStore(state => state.chatRoomId);
  const pendingMessages = useChatRoomOptimisticMessagesStore(state => state.pendingMessages);
  const filter: ConversationsLoadMoreMessagesParams = {
    limit: LIMIT_MESSAGES,
  };

  const { data, error, isError, ...rest } = useConversationsLoadMoreMessagesInfinite(chatRoomId, filter, {
    query: {
      enabled: !!chatRoomId,
      getNextPageParam: lastPage => lastPage?.data?.nextCursor,
    },
  });

  useGetMethodErrorTracking({
    error,
    extra: { context: 'useGetMessagesByChatroomId' },
    isError,
  });

  const items = useMemo(() => {
    const serverItems = data?.pages ? [...data.pages].reverse().flatMap(page => page.data.items) : [];
    const serverUids = new Set(serverItems.map(item => item.uid));

    const pendingList = Object.values(pendingMessages).filter(
      msg => !serverUids.has(msg.uid) && msg.conversationId === chatRoomId,
    );

    if (pendingList.length === 0) return serverItems;

    return [...serverItems, ...pendingList].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
  }, [data?.pages, pendingMessages, chatRoomId]);

  useEffect(() => {
    if (!data?.pages) return;
    const serverUids = new Set(data.pages.flatMap(page => page.data.items).map(item => item.uid));
    const { pendingMessages: currentPending, removePendingMessage } = useChatRoomOptimisticMessagesStore.getState();
    Object.keys(currentPending).forEach(uid => {
      const msg = currentPending[uid];
      if (serverUids.has(uid) && !msg.isSending && !msg.isError) {
        removePendingMessage(uid);
      }
    });
  }, [data?.pages]);

  return { ...rest, items };
};
