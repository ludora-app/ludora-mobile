import { QueryClient } from '@tanstack/react-query';

import { MessageDtoGlobalStatus } from '@/api/generated/model';

import { updateConversationListCache } from './update-conversation-list-cache';
import { useChatRoomOptimisticMessagesStore } from '../../store/chat-room-optimistic-messages.store';
import { CreateMessageDto, MessageQueueContext, MessagesInfiniteData } from './chat-room-message-queue.types';

export const markMessageAsFailed = (
  queryClient: QueryClient,
  ctx: MessageQueueContext,
  messageUid: string,
  messageData: CreateMessageDto,
) => {
  const { updatePendingMessage } = useChatRoomOptimisticMessagesStore.getState();
  updatePendingMessage(messageUid, { isError: true, isSending: false });

  const currentQueryKey = ctx.getQueryKey();

  if (ctx.chatRoomId) {
    updateConversationListCache(
      queryClient,
      ctx.chatRoomId,
      {
        content: messageData.content ?? '',
        createdAt: new Date().toISOString(),
        globalStatus: 'FAILED' as MessageDtoGlobalStatus,
        isSender: true,
        type: messageData.type,
        uid: messageUid,
      },
      ctx.currentUserSender,
    );
  }

  if (currentQueryKey) {
    queryClient.setQueryData<MessagesInfiniteData>(currentQueryKey, oldData => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        pages: oldData.pages.map(page => ({
          ...page,
          data: {
            ...page.data,
            items: page.data.items.map(msg =>
              msg.uid === messageUid ? { ...msg, isError: true, isSending: false } : msg,
            ),
          },
        })),
      };
    });
  }
};
