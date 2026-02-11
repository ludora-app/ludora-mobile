import { Message } from '@/features/chat-room/mocks/messages.mock';

import ChatRoomMessageListItemContentString from './chat-room-message-list-item-content-string.component';

export default function ChatRoomMessageListItemContent({ messageData }: { messageData: Message }) {
  switch (messageData.type) {
    case 'TEXT':
      return <ChatRoomMessageListItemContentString messageData={messageData} />;
    default:
      return null;
  }
}
