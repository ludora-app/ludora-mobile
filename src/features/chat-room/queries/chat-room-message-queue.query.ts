import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { getConversationsLoadMoreMessagesQueryKey } from '@generatedApi/conversations/conversations.api';

import { emit } from '@/services/websocket/websocket.client';
import { MessageCollectionItemDto, PaginationResponseMessageCollectionItemDto } from '@/api/generated/model';

import { useChatRoomStore } from '../store/chat-room.store';

type WsSendMessageResponse = {
  conversationUid: string;
  message: {
    uid: string;
    content: string;
    createdAt: string;
    globalStatus: string;
    type: string;
    hasAnyRead: boolean;
    hasEveryoneRead: boolean;
  };
};

type MessagesInfiniteData = InfiniteData<PaginationResponseMessageCollectionItemDto>;

export const useChatRoomMessageOptimisticQueue = () => {
  const chatRoomId = useChatRoomStore(store => store.chatRoomId);
  const setChatRoomId = useChatRoomStore(store => store.setChatRoomId);
  const queryClient = useQueryClient();

  const getQueryKey = () => {
    if (!chatRoomId) return undefined;
    return getConversationsLoadMoreMessagesQueryKey(chatRoomId, { limit: 10 });
  };

  const addOptimisticMessageToQueue = async (content: string | string[], type: 'TEXT') => {
    if (!content) return;

    const messageUid = `temp-${new Date().getTime()}`;
    const newMessage: MessageCollectionItemDto = {
      content: Array.isArray(content) ? content.join(' ') : content,
      createdAt: new Date().toISOString(),
      globalStatus: 'SENT',
      hasAnyRead: false,
      hasEveryoneRead: false,
      type,
      uid: messageUid,
    };

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

    // Send message via Socket.IO
    const messageData = {
      content: Array.isArray(content) ? content.join(' ') : content,
      conversationUid: chatRoomId,
      type,
    };

    emit('sendMessage', messageData, (response: WsSendMessageResponse) => {
      console.log('response====>', response);
      if (response?.conversationUid && !chatRoomId) {
        setChatRoomId(response.conversationUid);
      }

      const currentQueryKey = getQueryKey();
      if (!currentQueryKey) return;

      queryClient.setQueryData<MessagesInfiniteData>(currentQueryKey, oldData => {
        if (!oldData) return oldData;

        const updatedPages = oldData.pages.map(page => ({
          ...page,
          data: {
            ...page.data,
            items: page.data.items.map(msg =>
              msg.uid === messageUid
                ? { ...msg, globalStatus: response.message?.globalStatus ?? ('DELIVERED' as const) }
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

  return { addOptimisticMessageToQueue };
};
