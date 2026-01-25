import { useRoute } from '@react-navigation/native';
import { ChatRoomData } from '@utils/routerParamsTypes';

export const useChatRoomRouter = () => {
  const router = useRoute();

  const routeParams = router.params as ChatRoomData;

  const chatRoomId = routeParams?.chatRoomId;
  const chatRoomName = routeParams?.chatRoomName;
  const chatRoomAvatar = routeParams?.chatRoomAvatar;
  const isGroup = routeParams?.isGroup;
  const isAdmin = routeParams?.isAdmin;
  const isEvent = routeParams?.isEvent;

  return {
    chatRoomAvatar,
    chatRoomId,
    chatRoomName,
    isAdmin,
    isEvent,
    isGroup,
  };
};
