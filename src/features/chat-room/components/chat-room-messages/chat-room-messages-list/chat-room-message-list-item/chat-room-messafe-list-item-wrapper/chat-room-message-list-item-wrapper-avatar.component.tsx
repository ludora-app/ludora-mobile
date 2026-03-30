import { Avatar } from '@ludo/ui';
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';

import ROUTES from '@/constants/routes.constants';
import { MessageCollectionItemDto } from '@/api/generated/model';
import { RootStackParamList } from '@/types/routes-params.types';

interface ChatRoomMessageListItemWrapperAvatarProps {
  messageData: MessageCollectionItemDto;
}

export default function ChatRoomMessageListItemWrapperAvatar({
  messageData,
}: ChatRoomMessageListItemWrapperAvatarProps) {
  const router = useRouter();
  const { isSender: isMessageFromMe, sender } = messageData || {};
  const {
    firstname: senderFirstName,
    imageUrl: senderImageUrl,
    lastname: senderLastName,
    uid: senderUid,
  } = sender || {};

  if (isMessageFromMe) {
    return null;
  }

  const handlePress = () => {
    if (!senderUid) return;
    const params: RootStackParamList[typeof ROUTES.CHAT_ROOM.USER_PROFILE] = {
      firstname: senderFirstName ?? '',
      imageUrl: senderImageUrl ?? undefined,
      lastname: senderLastName ?? '',
      userId: senderUid,
    };
    router.navigate({ params, pathname: ROUTES.CHAT_ROOM.USER_PROFILE_UID(senderUid) });
  };

  return (
    <Pressable onPress={handlePress} hitSlop={8}>
      <Avatar
        size="xs"
        data={{
          firstname: senderFirstName,
          imageUrl: senderImageUrl ? { uri: senderImageUrl } : undefined,
          lastname: senderLastName,
        }}
      />
    </Pressable>
  );
}
