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

  // Reset state to "sending"
  updatePendingMessage(tempMessageUid, { isError: false, isSending: true });

  // Update cache to reflect the retry
  const queryKey = ctx.getQueryKey();
  if (queryKey) {
    queryClient.setQueryData<MessagesInfiniteData>(queryKey, oldData => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        pages: oldData.pages.map(page => ({
          ...page,
          data: {
            ...page.data,
            items: page.data.items.map(msg =>
              msg.uid === tempMessageUid ? { ...msg, isError: false, isSending: true } : msg,
            ),
          },
        })),
      };
    });
  }

  if (ctx.chatRoomId) {
    updateConversationListCache(
      queryClient,
      ctx.chatRoomId,
      {
        content: failedMessage.content,
        createdAt: failedMessage.createdAt,
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
