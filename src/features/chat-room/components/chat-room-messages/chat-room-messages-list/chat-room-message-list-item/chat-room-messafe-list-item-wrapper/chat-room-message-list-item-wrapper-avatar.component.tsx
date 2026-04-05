import { Avatar } from '@ludo/ui';
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { StrictOmit } from '@chillui/ui';
import { memo, useCallback } from 'react';

import ROUTES from '@/constants/routes.constants';
import { MessageCollectionItemDto } from '@/api/generated/model';
import { RootStackParamList } from '@/types/routes-params.types';
import { useChatRoomSessionTeam } from '@/features/chat-room/utils/chat-room-session-team.utils';

interface ChatRoomMessageListItemWrapperAvatarProps {
  messageData: MessageCollectionItemDto;
}

function ChatRoomMessageListItemWrapperAvatar({ messageData }: ChatRoomMessageListItemWrapperAvatarProps) {
  const router = useRouter();
  const { isSender: isMessageFromMe, sender } = messageData || {};
  const {
    firstname: senderFirstName,
    imageUrl: senderImageUrl,
    lastname: senderLastName,
    uid: senderUid,
  } = sender || {};
  const { isTeamA } = useChatRoomSessionTeam();

  const handlePress = useCallback(() => {
    if (!senderUid) return;
    const params: StrictOmit<RootStackParamList[typeof ROUTES.CHAT_ROOM.USER_PROFILE], 'userId'> = {
      firstname: senderFirstName ?? '',
      imageUrl: senderImageUrl ?? undefined,
      lastname: senderLastName ?? '',
    };
    router.navigate({ params, pathname: ROUTES.CHAT_ROOM.USER_PROFILE_UID(senderUid) });
  }, [senderUid, senderFirstName, senderImageUrl, senderLastName, router]);

  if (isMessageFromMe) {
    return null;
  }

  return (
    <Pressable onPress={handlePress} hitSlop={8}>
      <Avatar
        size="xs"
        data={{
          firstname: senderFirstName,
          imageUrl: senderImageUrl ? { uri: senderImageUrl } : undefined,
          lastname: senderLastName,
        }}
        colorVariant={isTeamA ? 'primary' : 'secondary'}
      />
    </Pressable>
  );
}

export default memo(ChatRoomMessageListItemWrapperAvatar);
