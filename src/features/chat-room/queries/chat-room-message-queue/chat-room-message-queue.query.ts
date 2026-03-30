import { useQueryClient } from '@tanstack/react-query';
import { getConversationsLoadMoreMessagesQueryKey } from '@generatedApi/conversations/conversations.api';

import { useUserMe } from '@/queries/user-me.query';
import { UserSimpleDisplayWithUidData } from '@/api/generated/model';

import { retryOptimisticMessage } from './retry-optimistic-message';
import { MessageQueueContext } from './chat-room-message-queue.types';
import { addOptimisticMessageToQueue } from './add-optimistic-message';
import { useChatRoomStore } from '../../context/chat-room-store-context';

export const useChatRoomMessageOptimisticQueue = () => {
  const chatRoomId = useChatRoomStore(store => store.chatRoomId);
  const chatRoomUserId = useChatRoomStore(store => store.chatRoomUserId);
  const setChatRoomId = useChatRoomStore(store => store.setChatRoomId);
  const setChatRoomUserId = useChatRoomStore(store => store.setChatRoomUserId);
  const queryClient = useQueryClient();
  const { userMe } = useUserMe();

  const currentUserSender: UserSimpleDisplayWithUidData | undefined = userMe
    ? {
        firstname: userMe.firstname,
        imageUrl: userMe.imageUrl ?? null,
        lastname: userMe.lastname,
        uid: userMe.uid,
      }
    : undefined;

  const getQueryKey = () => {
    if (!chatRoomId) return undefined;
    return getConversationsLoadMoreMessagesQueryKey(chatRoomId, { limit: 10 });
  };

  const ctx: MessageQueueContext = {
    chatRoomId,
    chatRoomUserId,
    currentUserSender,
    getQueryKey,
    setChatRoomId,
    setChatRoomUserId,
  };

  return {
    addOptimisticMessageToQueue: (content: string, type: 'TEXT') =>
      addOptimisticMessageToQueue(queryClient, ctx, content, type),
    retryOptimisticMessage: (tempMessageUid: string) => retryOptimisticMessage(queryClient, ctx, tempMessageUid),
  };
};
