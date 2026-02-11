import { memo } from 'react';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Box, BoxGrow, BoxRowCenterBetween, String } from '@ludo/ui';

import ROUTES from '@/constants/routes.constants';
import { RootStackParamList } from '@/types/routes-params.types';
import { ConversationCollectionResponseData } from '@/api/generated/model';

import ChatConversationListItemAvatar from './chat-conversations-list-item-avatar/chat-conversations-list-item-avatar.component';
import ChatConversationListItemLastMessage from './chat-conversation-list-item-last-message/chat-conversation-list-item-last-message.component';
import ChatConversationListItemLastMessageDate from './chat-conversation-list-item-last-message/chat-conversation-list-item-last-message-date.component';

interface ChatConversationsListItemProps {
  item: ConversationCollectionResponseData;
}

function ChatConversationsListItem({ item }: ChatConversationsListItemProps) {
  const router = useRouter();
  const { imageUrl: chatRoomAvatar, name: chatRoomName, uid: chatRoomId } = item || {};

  const handlePress = () => {
    const params: RootStackParamList[typeof ROUTES.CHAT_ROOM.INDEX] = {
      imageUrl: chatRoomAvatar,
      name: chatRoomName,
    };
    router.push({ params, pathname: ROUTES.CHAT_ROOM.INDEX_UID(chatRoomId) });
  };

  return (
    <TouchableOpacity className="border-b-muted/30 flex-row items-center gap-2 border-b py-3" onPress={handlePress}>
      <ChatConversationListItemAvatar conversation={item} />
      <BoxGrow className="gap-1">
        <BoxRowCenterBetween className="gap-2">
          <String truncate>{chatRoomName}</String>
          <ChatConversationListItemLastMessageDate conversation={item} />
        </BoxRowCenterBetween>
        <BoxRowCenterBetween className="gap-2">
          <ChatConversationListItemLastMessage conversation={item} />
          <Box className="bg-primary size-6 items-center justify-center rounded-full">
            <String variant="body-sm" colorVariant="white">
              2
            </String>
          </Box>
        </BoxRowCenterBetween>
      </BoxGrow>
    </TouchableOpacity>
  );
}

export default memo(ChatConversationsListItem);
