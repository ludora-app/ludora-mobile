import { Avatar } from '@ludo/ui';

import { Message } from '@/features/chat-room/mocks/messages.mock';

interface ChatRoomMessageListItemWrapperAvatarProps {
  messageData: Message;
}

export default function ChatRoomMessageListItemWrapperAvatar({
  messageData,
}: ChatRoomMessageListItemWrapperAvatarProps) {
  const { isMe: isMessageFromMe } = messageData || {};

  if (isMessageFromMe) {
    return null;
  }

  return (
    <Avatar
      size="xs"
      data={{
        firstname: '',
        imageUrl: messageData?.image_url ?? '',
        lastname: '',
      }}
    />
  );
}
