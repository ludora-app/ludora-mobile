import { useGetChatRoomUserById } from '@api/hooks/chatRoomUserByid.hook';

export const useGetUserDataByMessageId = (id: string, isMessageFromMe: boolean) => {
  const { data: userData } = useGetChatRoomUserById(id, isMessageFromMe);
  return { data: userData?.data };
};
