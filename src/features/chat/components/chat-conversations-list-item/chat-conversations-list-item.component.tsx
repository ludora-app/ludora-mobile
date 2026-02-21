import { memo, useMemo } from 'react';
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { Box, BoxGrow, BoxRowCenterBetween, Icon, String } from '@ludo/ui';

import { serialize } from '@/utils/json.utils';
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
  const {
    imageUrl: chatRoomAvatar,
    name: chatRoomName,
    receiver,
    sessionData,
    type: conversationType,
    uid: chatRoomId,
    unreadMessagesCount
  } = item || {};


  console.log("item=====>", item);

  const { teamLabel } = sessionData || {};

  const handlePress = () => {
    const params: RootStackParamList[typeof ROUTES.CHAT_ROOM.INDEX] = {
      imageUrl: chatRoomAvatar,
      name: chatRoomName,
      receiver: conversationType === "PRIVATE" ? serialize(receiver) : undefined,
      type: conversationType
    };
    router.push({ params, pathname: ROUTES.CHAT_ROOM.INDEX_UID(chatRoomId) });
  };

  const showLudoKingIcon = useMemo(() => conversationType === "SESSION", [conversationType]);

  const ludoKingType = useMemo(() => teamLabel === "A" ? "ludo-king" : "ludo-king-2", [teamLabel]);

  return (
    <Pressable className="border-b-muted/30 flex-row items-center gap-2 border-b py-3" onPress={handlePress}>
      <ChatConversationListItemAvatar conversation={item} />
      <BoxGrow className="gap-1">
        <BoxRowCenterBetween className="gap-2">
          <String truncate font="primarySemiBold">{chatRoomName}</String>
          <ChatConversationListItemLastMessageDate conversation={item} />
        </BoxRowCenterBetween>
        <BoxRowCenterBetween className="gap-2">
          <ChatConversationListItemLastMessage conversation={item} />
          {unreadMessagesCount > 0 && (
            <Box className="bg-primary size-6 items-center justify-center rounded-full">
              <String variant="body-sm" colorVariant="white">
                {unreadMessagesCount}
              </String>
            </Box>
          )}
        </BoxRowCenterBetween>
      </BoxGrow>
      {showLudoKingIcon && <Icon name={ludoKingType} size="xl" />}
    </Pressable>
  );
}

export default memo(ChatConversationsListItem);
