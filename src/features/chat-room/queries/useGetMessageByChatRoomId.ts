import { useGet as getMessageByChatRoomId } from '@api/hooks/chatRoomMessages.hook';

export const useGetMessageByChatRoomId = (chatRoomId: string) => {
  const { data: messages, isLoading } = getMessageByChatRoomId(chatRoomId);

  return {
    isLoading,
    messages: messages?.data?.messages,
  };
};
