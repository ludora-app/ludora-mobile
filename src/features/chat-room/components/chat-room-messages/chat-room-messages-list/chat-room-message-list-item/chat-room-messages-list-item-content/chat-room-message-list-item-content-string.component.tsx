import { String } from '@ludo/ui';

import { MessageCollectionItemDto } from '@/api/generated/model';

interface ChatRoomMessageListItemContentStringProps {
  messageData: MessageCollectionItemDto;
}

export default function ChatRoomMessageListItemContentString({ messageData }: ChatRoomMessageListItemContentStringProps) {
  const { content: messageContent } = messageData || {};

  return (
    <String color="#FFF" size="sm">
      {messageContent}
    </String>
  );
}
