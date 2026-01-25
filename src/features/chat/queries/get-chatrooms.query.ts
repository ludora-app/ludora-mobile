import { useGet as useGetChatRoomsEvents } from '@api/hooks/chatRoomsEvents.hook';
import { useGet as useGetChatRoomsPrivate } from '@api/hooks/chatRoomsPrivate.hook';

export const useGetPrivateChatRooms = () => {
  const { data, error, isLoading } = useGetChatRoomsPrivate();
  return { data: data?.data, error, isLoading };
};

export const useGetEventsChatRooms = () => {
  const { data, error, isLoading } = useGetChatRoomsEvents();
  return { data: data?.data, error, isLoading };
};
