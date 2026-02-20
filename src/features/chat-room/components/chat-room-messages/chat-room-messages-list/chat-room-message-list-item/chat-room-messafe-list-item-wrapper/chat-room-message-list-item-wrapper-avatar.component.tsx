import { Avatar } from '@ludo/ui';

import { MessageCollectionItemDto } from '@/api/generated/model';

interface ChatRoomMessageListItemWrapperAvatarProps {
  messageData: MessageCollectionItemDto;
}

export default function ChatRoomMessageListItemWrapperAvatar({
  messageData,
}: ChatRoomMessageListItemWrapperAvatarProps) {
  const { isSender: isMessageFromMe, sender } = messageData || {};
  const { firstname: senderFirstName, imageUrl: senderImageUrl, lastname: senderLastName } = sender || {};

  if (isMessageFromMe) {
    return null;
  }

  return (
    <Avatar
      size="xs"
      data={{
        firstname: senderFirstName,
        imageUrl: senderImageUrl,
        lastname: senderLastName,
      }}
    />
  );
}
