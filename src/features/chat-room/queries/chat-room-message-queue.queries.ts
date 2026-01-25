import { useUserMe } from '@/queries';
import { QUERY_KEY } from '@api/utils/api.queryKey';
import { useQueryClient } from '@tanstack/react-query';
import { usePost as usePostMessage } from '@api/hooks/chatRoomMessages.hook';
import { MessageResponse, MessageType, Response } from '@api/utils/api.types';

import { useChatRoomRouter } from '../hooks/useChatRoomRouter';

export const useChatRoomMessageOptimisticQueue = () => {
  const { chatRoomId } = useChatRoomRouter();

  const { mutateAsync: postMessage } = usePostMessage();
  const { userId = '' } = useUserMe();
  const queryClient = useQueryClient();

  const addOptimisticMessageToQueue = async (content: string | string[], type: MessageType) => {
    if (!content) return;
    const newMessage = {
      content,
      created_at: new Date(),
      id: new Date().getTime().toString(),
      type,
      user_id: userId,
    };

    queryClient.setQueryData(
      [QUERY_KEY.CHAT_MESSAGE_BY_CHAT_ROOM_ID, chatRoomId],
      (oldData: Response<MessageResponse>) => {
        return oldData?.data
          ? {
              ...oldData,
              data: {
                messages: [{ ...newMessage, isSending: true }, ...oldData.data.messages],
              },
            }
          : { data: { messages: [newMessage] } };
      },
    );
    setTimeout(async () => {
      try {
        const response = await postMessage(newMessage);
        const sendedMessage = response.data?.message;
        queryClient.setQueryData(
          [QUERY_KEY.CHAT_MESSAGE_BY_CHAT_ROOM_ID, chatRoomId],
          (oldData: Response<MessageResponse>) => {
            if (!oldData?.data) return oldData;
            const updatedMessages = oldData.data.messages.map(message =>
              message.id === newMessage.id ? { ...sendedMessage, isSending: false } : message,
            );
            return {
              ...oldData,
              data: {
                ...oldData.data,
                messages: [...updatedMessages],
              },
            };
          },
        );
      } catch (error) {
        console.log('error', error);
      }
    }, 5000);
  };
  return { addOptimisticMessageToQueue };
};
