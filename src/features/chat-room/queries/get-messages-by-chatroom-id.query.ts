import { useEffect, useMemo } from 'react';
import { useConversationsLoadMoreMessagesInfinite } from '@generatedApi/conversations/conversations.api';

import { ConversationsLoadMoreMessagesParams } from '@/api/generated/model';

import { useChatRoomStore } from '../store/chat-room.store';
import { useChatRoomOptimisticMessagesStore } from '../store/chat-room-optimistic-messages.store';

const LIMIT_MESSAGES = 10;

export const useGetMessagesByChatroomId = () => {
  const chatRoomId = useChatRoomStore(state => state.chatRoomId);
  const pendingMessages = useChatRoomOptimisticMessagesStore(state => state.pendingMessages);
  const filter: ConversationsLoadMoreMessagesParams = {
    limit: LIMIT_MESSAGES,
  };

  const { data, ...rest } = useConversationsLoadMoreMessagesInfinite(chatRoomId, filter, {
    query: {
      enabled: !!chatRoomId,
      getNextPageParam: lastPage => lastPage?.data?.nextCursor,
    },
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
    const { pendingMessages: currentPending, removePendingMessage } =
      useChatRoomOptimisticMessagesStore.getState();
    Object.keys(currentPending).forEach(uid => {
      if (serverUids.has(uid) && !currentPending[uid].isSending) {
        removePendingMessage(uid);
      }
    });
  }, [data?.pages]);

  return { ...rest, items };
};
