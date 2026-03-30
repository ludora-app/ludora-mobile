import { useLocalSearchParams } from 'expo-router';

import ROUTES from '@/constants/routes.constants';
import { RootStackParamList } from '@/types/routes-params.types';

import ChatRoomBlockUserDialog from './chat-room-block-user-dialog.component';

export default function ChatRoomUserProfileBlockUser() {
  const { firstname, lastname, userId } =
    useLocalSearchParams<RootStackParamList[typeof ROUTES.CHAT_ROOM.USER_PROFILE]>();

  if (!userId) return null;

  return (
    <ChatRoomBlockUserDialog
      dialogSource="chat_room_user_profile_block_user"
      firstname={firstname}
      lastname={lastname}
      userId={userId}
    />
  );
}
