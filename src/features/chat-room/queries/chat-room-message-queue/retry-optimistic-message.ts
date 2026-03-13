import { QueryClient } from '@tanstack/react-query';

import { MessageDtoGlobalStatus, MessageDtoType } from '@/api/generated/model';

import { sendMessageViaSocket } from './send-message-via-socket';
import { updateConversationListCache } from './update-conversation-list-cache';
import { MessageQueueContext, MessagesInfiniteData } from './chat-room-message-queue.types';
import { useChatRoomOptimisticMessagesStore } from '../../store/chat-room-optimistic-messages.store';

export const retryOptimisticMessage = (queryClient: QueryClient, ctx: MessageQueueContext, tempMessageUid: string) => {
  const { pendingMessages, updatePendingMessage } = useChatRoomOptimisticMessagesStore.getState();
  const failedMessage = pendingMessages[tempMessageUid];

  if (!failedMessage || !failedMessage.isError) return;

  // Reset state to "sending" with updated timestamp
  const retryCreatedAt = new Date().toISOString();
  updatePendingMessage(tempMessageUid, { createdAt: retryCreatedAt, isError: false, isSending: true });

  // Update cache to reflect the retry — re-insert if the message was evicted by a refetch
  const queryKey = ctx.getQueryKey();
  if (queryKey) {
    queryClient.setQueryData<MessagesInfiniteData>(queryKey, oldData => {
      if (!oldData) return oldData;

      // Check if the message still exists in any page
      const messageExists = oldData.pages.some(page => page.data.items.some(msg => msg.uid === tempMessageUid));

      if (messageExists) {
        // Message is still in cache — just update its status
        return {
          ...oldData,
          pages: oldData.pages.map(page => ({
            ...page,
            data: {
              ...page.data,
              items: page.data.items.map(msg =>
                msg.uid === tempMessageUid
                  ? { ...msg, createdAt: retryCreatedAt, isError: false, isSending: true }
                  : msg,
              ),
            },
          })),
        };
      }

      // Message was evicted by a server refetch — re-insert it into the first page
      const updatedPages = [...oldData.pages];
      const firstPage = updatedPages[0];
      if (firstPage) {
        updatedPages[0] = {
          ...firstPage,
          data: {
            ...firstPage.data,
            items: [
              ...firstPage.data.items,
              {
                ...failedMessage,
                createdAt: retryCreatedAt,
                isError: false,
                isSending: true,
              } as unknown as (typeof firstPage.data.items)[number],
            ],
          },
        };
      }

      return {
        ...oldData,
        pages: updatedPages,
      };
    });
  }

  if (ctx.chatRoomId) {
    updateConversationListCache(
      queryClient,
      ctx.chatRoomId,
      {
        content: failedMessage.content,
        createdAt: retryCreatedAt,
        globalStatus: MessageDtoGlobalStatus.SENT,
        isSender: true,
        type: failedMessage.type as MessageDtoType,
        uid: tempMessageUid,
      },
      ctx.currentUserSender,
    );
  }

  // Re-send the message
  sendMessageViaSocket(queryClient, ctx, tempMessageUid, {
    content: failedMessage.content,
    ...(ctx.chatRoomId ? { conversationUid: ctx.chatRoomId } : { recipientUid: ctx.chatRoomUserId ?? undefined }),
    type: failedMessage.type as MessageDtoType,
  });
};
