

import { MessageCollectionItemDto } from '@/api/generated/model';

import ChatRoomMessageListItemContentString from './chat-room-message-list-item-content-string.component';


type ChatRoomMessageListItemContentProps = {
  messageData: MessageCollectionItemDto
}

export default function ChatRoomMessageListItemContent({ messageData }: ChatRoomMessageListItemContentProps) {
  const { type: messageType } = messageData || {};

  switch (messageType) {
    case 'TEXT':
      return <ChatRoomMessageListItemContentString messageData={messageData} />;
    default:
      return null;
  }
}
