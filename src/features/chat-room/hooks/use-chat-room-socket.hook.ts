import { useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { on, emit, off } from '@/services/websocket/websocket.client';
import { WS_RESOURCES, TWebSocketMessage } from '@/types/websocket.type';

import type { Message, PaginatedMessagesResponse } from '../mocks/messages.mock';

export const useChatRoomSocket = (chatRoomId: string) => {
  const queryClient = useQueryClient();

  const handleIncomingMessage = useCallback(
    (wsMessage: TWebSocketMessage<Message>) => {
      if (wsMessage.resource !== WS_RESOURCES.MESSAGE) return;

      const { payload: newMessage } = wsMessage;

      // Update React Query cache with the new message
      queryClient.setQueryData<{
        pages: PaginatedMessagesResponse[];
        pageParams: number[];
      }>(['messages'], oldData => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return {
            pageParams: [0],
            pages: [
              {
                data: [newMessage],
                hasMore: false,
                nextCursor: null,
                total: 1,
              },
            ],
          };
        }

        const updatedPages = [...oldData.pages];
        const lastPageIndex = updatedPages.length - 1;
        const lastPage = updatedPages[lastPageIndex];

        // Check if message already exists (avoid duplicates)
        const messageExists = lastPage.data.some(msg => msg.uid === newMessage.uid);
        if (messageExists) return oldData;

        updatedPages[lastPageIndex] = {
          ...lastPage,
          data: [...lastPage.data, newMessage],
          total: lastPage.total + 1,
        };

        return {
          ...oldData,
          pages: updatedPages,
        };
      });
    },
    [queryClient],
  );

  const sendMessage = useCallback(
    (content: string, type: 'TEXT' = 'TEXT') => {
      const messageData = {
        action: 'SEND_MESSAGE',
        payload: {
          chatRoomId,
          content,
          type,
        },
        resource: WS_RESOURCES.MESSAGE,
      };

      emit('message', messageData);
    },
    [chatRoomId],
  );

  useEffect(() => {
    // Listen for incoming messages
    on('message', handleIncomingMessage);

    return () => {
      // Cleanup listener on unmount
      off('message', handleIncomingMessage);
    };
  }, [handleIncomingMessage]);

  return {
    sendMessage,
  };
};
