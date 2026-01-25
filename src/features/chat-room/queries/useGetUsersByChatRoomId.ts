import { useGet as useGetChatRoomUsersById } from '@api/hooks/chatRoomUsersById.hook';

export const useGetUsersByChatRoomId = (chatRoomId: string) => {
  const { data, error, isLoading } = useGetChatRoomUsersById(chatRoomId);

  return {
    data: data?.data,
    error,
    isLoading,
  };
};
