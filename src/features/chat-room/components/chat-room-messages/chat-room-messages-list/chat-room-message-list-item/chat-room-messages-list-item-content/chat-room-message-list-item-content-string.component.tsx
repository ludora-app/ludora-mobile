import { String } from '@ludo/ui';

import { Message } from '@/features/chat-room/mocks/messages.mock';

interface ChatRoomMessageListItemContentStringProps {
  messageData: Message;
}

export default function ChatRoomMessageListItemContentString({ messageData }: ChatRoomMessageListItemContentStringProps) {
  return (
    <String color="#FFF" size="sm">
      {messageData.content}
    </String>
  );
}
