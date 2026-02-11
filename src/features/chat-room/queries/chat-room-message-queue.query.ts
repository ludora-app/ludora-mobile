import { useQueryClient } from '@tanstack/react-query';

import { WS_RESOURCES } from '@/types/websocket.type';
import { emit } from '@/services/websocket/websocket.client';

import type { Message, PaginatedMessagesResponse } from '../mocks/messages.mock';

export const useChatRoomMessageOptimisticQueue = (chatRoomId?: string) => {
  const queryClient = useQueryClient();

  const addOptimisticMessageToQueue = async (content: string | string[], type: 'TEXT') => {
    if (!content) return;

    const messageUid = `temp-${new Date().getTime()}`;
    const newMessage: Message = {
      content: Array.isArray(content) ? content.join(' ') : content,
      created_at: new Date(),
      image_url: undefined,
      isMe: true,
      isSending: true,
      message_reads: [],
      type,
      uid: messageUid,
      user_id: 'user-me-123',
    };

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

    // Send message via Socket.IO
    // if (chatRoomId) {
    const messageData = {
      action: 'SEND_MESSAGE',
      payload: {
        chatRoomId: 'resr',
        content: Array.isArray(content) ? content.join(' ') : content,
        tempUid: messageUid,
        type,
      },
      resource: WS_RESOURCES.MESSAGE,
    };

    emit('sendMessage', messageData);
    // }

    // Still keep the timeout for UI feedback in this demo,
    // but in a real app, you'd wait for a socket confirmation event
    setTimeout(() => {
      queryClient.setQueryData<{
        pages: PaginatedMessagesResponse[];
        pageParams: number[];
      }>(['messages'], oldData => {
        if (!oldData) return oldData;

        const updatedPages = oldData.pages.map(page => ({
          ...page,
          data: page.data.map(msg => (msg.uid === messageUid ? { ...msg, isSending: false } : msg)),
        }));

        return {
          ...oldData,
          pages: updatedPages,
        };
      });
    }, 1000); // Reduced delay since we are actually sending it now
  };

  return { addOptimisticMessageToQueue };
};
