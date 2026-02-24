import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { getConversationsLoadMoreMessagesQueryKey } from '@generatedApi/conversations/conversations.api';

import { useUserMe } from '@/queries/user-me.query';
import { emit, isConnected } from '@/services/websocket/websocket.client';
import {
  ConversationCollectionResponseData,
  MessageCollectionItemDtoGlobalStatus,
  MessageDto,
  MessageDtoGlobalStatus,
  MessageDtoType,
  PaginationResponseConversationCollectionResponseData,
  PaginationResponseMessageCollectionItemDto,
  SenderDto,
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
type ConversationsInfiniteData = InfiniteData<PaginationResponseConversationCollectionResponseData>;

interface CreateMessageDto {
  file?: any;

  content?: string;

  sessionUid?: string;

  type: MessageDtoType;

  recipientUid?: string;

  conversationUid?: string;
}

const ERROR_SENDING_MESSAGE = 'MESSAGE_SEND_FAILED';
const MESSAGE_SEND_TIMEOUT_MS = 15_000;

export const useChatRoomMessageOptimisticQueue = () => {
  const chatRoomId = useChatRoomStore(store => store.chatRoomId);
  const chatRoomUserId = useChatRoomStore(store => store.chatRoomUserId);
  const setChatRoomId = useChatRoomStore(store => store.setChatRoomId);
  const setChatRoomUserId = useChatRoomStore(store => store.setChatRoomUserId);
  const addPendingMessage = useChatRoomOptimisticMessagesStore(store => store.addPendingMessage);
  const removePendingMessage = useChatRoomOptimisticMessagesStore(store => store.removePendingMessage);
  const updatePendingMessage = useChatRoomOptimisticMessagesStore(store => store.updatePendingMessage);
  const queryClient = useQueryClient();
  const { userMe } = useUserMe();

  const currentUserSender: SenderDto | undefined = userMe
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

  const updateConversationListCache = (
    conversationUid: string,
    lastMessage: MessageDto,
    sender: SenderDto | null | undefined,
  ) => {
    queryClient.setQueriesData<ConversationsInfiniteData>({ queryKey: ['/conversations/list/collection'] }, oldData => {
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
        return { ...oldData, pages: updatedPages };
      }

      return oldData;
    });
  };

  const markMessageAsFailed = (messageUid: string, messageData: CreateMessageDto) => {
    updatePendingMessage(messageUid, { isError: true, isSending: false });

    const currentQueryKey = getQueryKey();

    if (chatRoomId) {
      updateConversationListCache(
        chatRoomId,
        {
          content: messageData.content ?? '',
          createdAt: new Date().toISOString(),
          globalStatus: 'FAILED' as MessageDtoGlobalStatus,
          isSender: true,
          type: messageData.type,
          uid: messageUid,
        },
        currentUserSender,
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

  /** Shared emit handler for both initial send and retry */
  const sendMessageViaSocket = (messageUid: string, messageData: CreateMessageDto) => {
    if (!isConnected()) {
      markMessageAsFailed(messageUid, messageData);
      return;
    }

    let hasResolved = false;

    const timeoutId = setTimeout(() => {
      if (hasResolved) return;
      hasResolved = true;

      const { pendingMessages } = useChatRoomOptimisticMessagesStore.getState();
      if (pendingMessages[messageUid]?.isSending) {
        markMessageAsFailed(messageUid, messageData);
      }
    }, MESSAGE_SEND_TIMEOUT_MS);

    const didEmit = emit('sendMessage', messageData, (response: WsSendMessageResponse) => {
      if (hasResolved) return;
      hasResolved = true;
      clearTimeout(timeoutId);

      if (response.error && response.error.code === ERROR_SENDING_MESSAGE) {
        markMessageAsFailed(messageUid, messageData);
        return;
      }

      const successResponse = response.data;
      const currentQueryKey = getQueryKey();

      if (successResponse.conversationUid && !chatRoomId) {
        setChatRoomId(successResponse.conversationUid);
        setChatRoomUserId(null);
        updatePendingMessage(messageUid, { conversationId: successResponse.conversationUid });
      }

      if (successResponse.conversationUid) {
        updateConversationListCache(
          successResponse.conversationUid,
          {
            content: messageData.content ?? '',
            createdAt: new Date().toISOString(),
            globalStatus: MessageDtoGlobalStatus.DELIVERED,
            isSender: true,
            type: messageData.type,
            uid: successResponse.messageUid,
          },
          currentUserSender,
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
        markMessageAsFailed(messageUid, messageData);
      }
    }
  };

  const addOptimisticMessageToQueue = async (content: string, type: 'TEXT') => {
    if (!content) return;

    const messageUid = `temp-${new Date().getTime()}`;
    const newMessage: OptimisticMessage = {
      content,
      conversationId: chatRoomId,
      createdAt: new Date().toISOString(),
      globalStatus: MessageCollectionItemDtoGlobalStatus.SENT,
      hasAnyRead: false,
      hasEveryoneRead: false,
      isSender: true,
      isSending: true,
      sender: currentUserSender ?? {
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

    if (chatRoomId) {
      updateConversationListCache(
        chatRoomId,
        {
          content,
          createdAt: newMessage.createdAt,
          globalStatus: MessageDtoGlobalStatus.SENT,
          isSender: true,
          type,
          uid: messageUid,
        },
        currentUserSender,
      );
    }

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

    if (chatRoomId) {
      updateConversationListCache(
        chatRoomId,
        {
          content: failedMessage.content,
          createdAt: failedMessage.createdAt,
          globalStatus: MessageDtoGlobalStatus.SENT,
          isSender: true,
          type: failedMessage.type as MessageDtoType,
          uid: tempMessageUid,
        },
        currentUserSender,
      );
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
