import { QueryClient } from '@tanstack/react-query';

import { MessageCollectionItemDtoGlobalStatus, MessageDtoGlobalStatus } from '@/api/generated/model';

import { sendMessageViaSocket } from './send-message-via-socket';
import { updateConversationListCache } from './update-conversation-list-cache';
import { MessageQueueContext, MessagesInfiniteData } from './chat-room-message-queue.types';
import { OptimisticMessage, useChatRoomOptimisticMessagesStore } from '../../store/chat-room-optimistic-messages.store';

export const addOptimisticMessageToQueue = async (
  queryClient: QueryClient,
  ctx: MessageQueueContext,
  content: string,
  type: 'TEXT',
) => {
  if (!content) return;

  const messageUid = `temp-${new Date().getTime()}`;
  const newMessage: OptimisticMessage = {
    content,
    conversationId: ctx.chatRoomId,
    createdAt: new Date().toISOString(),
    globalStatus: MessageCollectionItemDtoGlobalStatus.SENT,
    hasAnyRead: false,
    hasEveryoneRead: false,
    isSender: true,
    isSending: true,
    sender: ctx.currentUserSender ?? {
      firstname: 'temp-sender',
      imageUrl: 'temp-sender',
      lastname: 'temp-sender',
      uid: 'temp-sender',
    },
    type,
    uid: messageUid,
  };

  // Track this optimistic message in the store
  const { addPendingMessage } = useChatRoomOptimisticMessagesStore.getState();
  addPendingMessage(newMessage);

  if (ctx.chatRoomId) {
    updateConversationListCache(
      queryClient,
      ctx.chatRoomId,
      {
        content,
        createdAt: newMessage.createdAt,
        globalStatus: MessageDtoGlobalStatus.SENT,
        isSender: true,
        type,
        uid: messageUid,
      },
      ctx.currentUserSender,
    );
  }

  const queryKey = ctx.getQueryKey();
  if (queryKey) {
    queryClient.setQueryData<MessagesInfiniteData>(queryKey, oldData => {
      if (!oldData || !oldData.pages || oldData.pages.length === 0) {
        return {
          pageParams: [undefined],
          pages: [
            {
              data: {
                items: [newMessage],
                nextCursor: null,
                totalCount: 1,
              },
            },
          ],
        };
      }

      const updatedPages = [...oldData.pages];
      const firstPage = updatedPages[0];

      updatedPages[0] = {
        ...firstPage,
        data: {
          ...firstPage.data,
          items: [...firstPage.data.items, newMessage],
          totalCount: firstPage.data.totalCount + 1,
        },
      };

      return {
        ...oldData,
        pages: updatedPages,
      };
    });
  }

  sendMessageViaSocket(queryClient, ctx, messageUid, {
    content,
    ...(ctx.chatRoomId ? { conversationUid: ctx.chatRoomId } : { recipientUid: ctx.chatRoomUserId ?? undefined }),
    type,
  });
};
