import { Avatar, Box, Icon, String } from '@ludo/ui';
import { useChatRoomRouter } from '../../hooks/useChatRoomRouter';
import ChatRoomHeaderGroupMenu from './chat-room-header-group-menu.component';
import ChatRoomHeaderPrivateMenu from './chat-room-header-private-menu.component';

export default function ChatRoomHeader() {
  const { chatRoomAvatar, chatRoomName, isGroup } = useChatRoomRouter();

  return (
    <Box className="relative z-50 flex-row items-center justify-between border-b border-gray-200 px-3 py-2">
      <Box className="flex-row items-center gap-2">
        <Icon name="arrow-left-solid" size="md" />
        <Avatar
          data={{
            firstname: chatRoomName,
            imageUrl: chatRoomAvatar,
            lastname: !isGroup ? chatRoomName : undefined,
          }}
          size="sm"
        />
        <String className="ml-2">{chatRoomName}</String>
      </Box>
      {isGroup ? <ChatRoomHeaderGroupMenu /> : <ChatRoomHeaderPrivateMenu />}
    </Box>
  );
}
