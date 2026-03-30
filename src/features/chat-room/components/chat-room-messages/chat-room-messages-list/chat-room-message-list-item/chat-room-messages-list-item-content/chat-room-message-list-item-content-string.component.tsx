import { String } from '@ludo/ui';

import { MessageCollectionItemDto } from '@/api/generated/model';

interface ChatRoomMessageListItemContentStringProps {
  messageData: MessageCollectionItemDto;
}

export default function ChatRoomMessageListItemContentString({
  messageData,
}: ChatRoomMessageListItemContentStringProps) {
  const { content: messageContent, isSender: isMessageFromMe } = messageData || {};

  return (
    <String color={isMessageFromMe ? '#FFF' : '#000'} font="primarySemiBold">
      {messageContent}
    </String>
  );
}
