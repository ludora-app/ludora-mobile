import { memo } from 'react';
import ROUTES from '@constants/ROUTES';
import { formatConversationDate } from '@utils/time';
import { ChatRoom, ChatRoomType } from '@api/utils/api.types';
import useNavigationHelper from '@helpers/useNavigationHelper';
import { Avatar, Box, RipplePressable, String } from '@components/nysaUi';

function ChatScreenConversationsWrapper({ conversation }: { conversation: ChatRoom }) {
  const navigation = useNavigationHelper();

  const isConversationGroupOrEvent =
    conversation.type === ChatRoomType.EVENT || conversation.type === ChatRoomType.GROUP;

  const conversationName = isConversationGroupOrEvent
    ? conversation.name
    : conversation.user?.firstname + ' ' + conversation.user?.lastname;

  const conversationAvatar = isConversationGroupOrEvent ? conversation.image_url : conversation.user?.image_url;

  return (
    <RipplePressable
      className="flex-row items-center gap-3 py-2"
      onPress={() => {
        navigation.navigate(ROUTES.chatRoom, {
          params: {
            chatRoomAvatar: conversationAvatar ?? '',
            chatRoomId: conversation.id,
            chatRoomName: conversationName ?? '',
            isAdmin: conversation.is_admin ?? false,
            isEvent: conversation.type === ChatRoomType.EVENT,
            isGroup: isConversationGroupOrEvent,
          },
          screen: ROUTES.chatRoomScreen,
        });
      }}
    >
      <Avatar
        size="lg"
        userData={{
          firstname: isConversationGroupOrEvent ? (conversation.name ?? '') : (conversation.user?.firstname ?? ''),
          image_url: conversationAvatar ?? '',
          lastname: !isConversationGroupOrEvent ? (conversation.user?.lastname ?? undefined) : undefined,
        }}
      />
      <Box className="flex-grow">
        <String size="lg">{conversationName}</String>
        <Box className="flex flex-row items-center gap-3">
          <Box className="flex-1">
            <String
              size="xs"
              variant={conversation.lastMessageIsRead ? 'light' : 'primary'}
              weight={conversation.lastMessageIsRead ? 'regular' : 'semiBold'}
              numberOfLines={1}
            >
              {conversation.lastMessageContent}
            </String>
          </Box>
          <Box className="flex-2">
            <String size="xs" variant="light" weight={conversation.lastMessageIsRead ? 'regular' : 'semiBold'}>
              {formatConversationDate(conversation.lastMessageAt)}
            </String>
          </Box>
        </Box>
      </Box>
    </RipplePressable>
  );
}

export default memo(ChatScreenConversationsWrapper, (prevProps, nextProps) => {
  return prevProps.conversation.lastMessageContent === nextProps.conversation.lastMessageContent;
});
