

import { MessageCollectionItemDto } from '@/api/generated/model';

import ChatRoomMessageListItemWrapper from './chat-room-messafe-list-item-wrapper/chat-room-message-list-item-wrapper.component';
import ChatRoomMessageListItemContent from './chat-room-messages-list-item-content/chat-room-message-list-item-content.component';

interface ChatRoomMessageListItemProps {
  item: MessageCollectionItemDto;
}

export default function ChatRoomMessageListItem(porps: ChatRoomMessageListItemProps) {
  const { item: messageData } = porps || {};

  return (
    <ChatRoomMessageListItemWrapper messageData={messageData}>
      <ChatRoomMessageListItemContent messageData={messageData} />
    </ChatRoomMessageListItemWrapper>
  );
}
