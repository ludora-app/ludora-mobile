import { QueryClient } from '@tanstack/react-query';

import { emit, isConnected } from '@/services/websocket/websocket.client';
import { MessageCollectionItemDtoGlobalStatus, MessageDtoGlobalStatus } from '@/api/generated/model';

import { markMessageAsFailed } from './mark-message-as-failed';
import { updateConversationListCache } from './update-conversation-list-cache';
import { useChatRoomOptimisticMessagesStore } from '../../store/chat-room-optimistic-messages.store';
import {
  CONVERSATIONS_LIST_QUERY_KEY,
  CreateMessageDto,
  ERROR_SENDING_MESSAGE,
  MESSAGE_SEND_TIMEOUT_MS,
  MessageQueueContext,
  MessagesInfiniteData,
  WsSendMessageResponse,
} from './chat-room-message-queue.types';

/** Shared emit handler for both initial send and retry */
export const sendMessageViaSocket = (
  queryClient: QueryClient,
  ctx: MessageQueueContext,
  messageUid: string,
  messageData: CreateMessageDto,
) => {
  if (!isConnected()) {
    markMessageAsFailed(queryClient, ctx, messageUid, messageData);
    return;
  }

  let hasResolved = false;

  const timeoutId = setTimeout(() => {
    if (hasResolved) return;
    hasResolved = true;

    const { pendingMessages } = useChatRoomOptimisticMessagesStore.getState();
    if (pendingMessages[messageUid]?.isSending) {
      markMessageAsFailed(queryClient, ctx, messageUid, messageData);
    }
  }, MESSAGE_SEND_TIMEOUT_MS);

  const didEmit = emit('sendMessage', messageData, (response: WsSendMessageResponse) => {
    if (hasResolved) return;
    hasResolved = true;
    clearTimeout(timeoutId);

    if (response.error && response.error.code === ERROR_SENDING_MESSAGE) {
      markMessageAsFailed(queryClient, ctx, messageUid, messageData);
      return;
    }

    const successResponse = response.data;
    const currentQueryKey = ctx.getQueryKey();

    const { removePendingMessage, updatePendingMessage } = useChatRoomOptimisticMessagesStore.getState();

    // New conversation created — refetch the conversation list
    if (successResponse.conversationUid && !ctx.chatRoomId) {
      ctx.setChatRoomId(successResponse.conversationUid);
      ctx.setChatRoomUserId(null);
      updatePendingMessage(messageUid, { conversationId: successResponse.conversationUid });

      queryClient.invalidateQueries({ queryKey: [CONVERSATIONS_LIST_QUERY_KEY] });
    }

    // Existing conversation — update the cache manually
    if (successResponse.conversationUid && ctx.chatRoomId) {
      updateConversationListCache(
        queryClient,
        successResponse.conversationUid,
        {
          content: messageData.content ?? '',
          createdAt: new Date().toISOString(),
          globalStatus: MessageDtoGlobalStatus.DELIVERED,
          isSender: true,
          type: messageData.type,
          uid: successResponse.messageUid,
        },
        ctx.currentUserSender,
      );
    }

    removePendingMessage(messageUid);

    if (!currentQueryKey) return;

    queryClient.setQueryData<MessagesInfiniteData>(currentQueryKey, oldData => {
      if (!oldData) return oldData;

      const updatedPages = oldData.pages.map(page => ({
        ...page,
        data: {
          ...page.data,
          items: page.data.items.map(msg =>
            msg.uid === messageUid
              ? {
                  ...msg,
                  globalStatus: MessageCollectionItemDtoGlobalStatus.DELIVERED,
                  isSending: false,
                  uid: successResponse.messageUid,
                }
              : msg,
          ),
        },
      }));

      return {
        ...oldData,
        pages: updatedPages,
      };
    });
  });

  if (!didEmit) {
    clearTimeout(timeoutId);
    if (!hasResolved) {
      hasResolved = true;
      markMessageAsFailed(queryClient, ctx, messageUid, messageData);
    }
  }
};
