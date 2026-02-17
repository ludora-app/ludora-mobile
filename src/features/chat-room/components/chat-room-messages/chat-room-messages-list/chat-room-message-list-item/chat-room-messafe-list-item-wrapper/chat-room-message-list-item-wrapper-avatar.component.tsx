import { Avatar } from '@ludo/ui';

import { MessageCollectionItemDto } from '@/api/generated/model';

interface ChatRoomMessageListItemWrapperAvatarProps {
  messageData: MessageCollectionItemDto;
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
