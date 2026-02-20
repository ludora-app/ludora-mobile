import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { getConversationsLoadMoreMessagesQueryKey } from '@generatedApi/conversations/conversations.api';

import { emit } from '@/services/websocket/websocket.client';
import {
  MessageCollectionItemDtoGlobalStatus,
  MessageDtoType,
  PaginationResponseMessageCollectionItemDto,
} from '@/api/generated/model';

import { useChatRoomStore } from '../store/chat-room.store';
import { OptimisticMessage, useChatRoomOptimisticMessagesStore } from '../store/chat-room-optimistic-messages.store';

type WsResponse<T, E> = {
  data: T;
  error: E;
};

type WsDataSendMessageResponse = {
  conversationUid: string;
  messageUid: string;
};

type WsErrorSendMessageResponse = {
  code: string;
  message: string;
};

type WsSendMessageResponse = WsResponse<WsDataSendMessageResponse, WsErrorSendMessageResponse>;

type MessagesInfiniteData = InfiniteData<PaginationResponseMessageCollectionItemDto>;

interface CreateMessageDto {
  file?: any;

  content?: string;

  sessionUid?: string;

  type: MessageDtoType;

  recipientUid?: string;

  conversationUid?: string;
}

const ERROR_SENDING_MESSAGE = 'MESSAGE_SEND_FAILED';

export const useChatRoomMessageOptimisticQueue = () => {
  const chatRoomId = useChatRoomStore(store => store.chatRoomId);
  const chatRoomUserId = useChatRoomStore(store => store.chatRoomUserId);
  const setChatRoomId = useChatRoomStore(store => store.setChatRoomId);
  const setChatRoomUserId = useChatRoomStore(store => store.setChatRoomUserId);
  const addPendingMessage = useChatRoomOptimisticMessagesStore(store => store.addPendingMessage);
  const removePendingMessage = useChatRoomOptimisticMessagesStore(store => store.removePendingMessage);
  const updatePendingMessage = useChatRoomOptimisticMessagesStore(store => store.updatePendingMessage);
  const queryClient = useQueryClient();

  const getQueryKey = () => {
    if (!chatRoomId) return undefined;
    return getConversationsLoadMoreMessagesQueryKey(chatRoomId, { limit: 10 });
  };

  /** Shared emit handler for both initial send and retry */
  const sendMessageViaSocket = (messageUid: string, messageData: CreateMessageDto) => {
    emit('sendMessage', messageData, (response: WsSendMessageResponse) => {
      const currentQueryKey = getQueryKey();

      // Handle error case
      if (response.error && response.error.code === ERROR_SENDING_MESSAGE) {
        updatePendingMessage(messageUid, { isError: true, isSending: false });

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
        return;
      }

      // Success case
      const successResponse = response.data;

      if (successResponse.conversationUid && !chatRoomId) {
        setChatRoomId(successResponse.conversationUid);
        setChatRoomUserId(null);
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
  };

  const addOptimisticMessageToQueue = async (content: string, type: 'TEXT') => {
    if (!content) return;

    const messageUid = `temp-${new Date().getTime()}`;
    const newMessage: OptimisticMessage = {
      content,
      createdAt: new Date().toISOString(),
      globalStatus: MessageCollectionItemDtoGlobalStatus.SENT,
      hasAnyRead: false,
      hasEveryoneRead: false,
      isSender: true,
      isSending: true,
      sender: {
        firstname: 'temp-sender',
        imageUrl: 'temp-sender',
        lastname: 'temp-sender',
        uid: 'temp-sender',
      },
      type,
      uid: messageUid,
    };

    // Track this optimistic message in the store
    addPendingMessage(newMessage);

    const queryKey = getQueryKey();
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

    sendMessageViaSocket(messageUid, {
      content,
      ...(chatRoomId ? { conversationUid: chatRoomId } : { recipientUid: chatRoomUserId ?? undefined }),
      type,
    });
  };

  const retryOptimisticMessage = (tempMessageUid: string) => {
    const { pendingMessages } = useChatRoomOptimisticMessagesStore.getState();
    const failedMessage = pendingMessages[tempMessageUid];

    if (!failedMessage || !failedMessage.isError) return;

    // Reset state to "sending"
    updatePendingMessage(tempMessageUid, { isError: false, isSending: true });

    // Update cache to reflect the retry
    const queryKey = getQueryKey();
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

    // Re-send the message
    sendMessageViaSocket(tempMessageUid, {
      content: failedMessage.content,
      ...(chatRoomId ? { conversationUid: chatRoomId } : { recipientUid: chatRoomUserId ?? undefined }),
      type: failedMessage.type as MessageDtoType,
    });
  };

  return { addOptimisticMessageToQueue, retryOptimisticMessage };
};
