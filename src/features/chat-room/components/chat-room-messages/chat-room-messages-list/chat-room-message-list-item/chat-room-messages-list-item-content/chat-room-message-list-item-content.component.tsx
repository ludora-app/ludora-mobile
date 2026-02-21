

import { MessageCollectionItemDto } from '@/api/generated/model';

import ChatRoomMessageListItemContentString from './chat-room-message-list-item-content-string.component';
import ChatRoomMessageListItemContentDeleted from './chat-room-message-list-item-content-deleted.component';


type ChatRoomMessageListItemContentProps = {
  messageData: MessageCollectionItemDto
}

export default function ChatRoomMessageListItemContent({ messageData }: ChatRoomMessageListItemContentProps) {
  const { globalStatus: messageGlobalStatus, type: messageType } = messageData || {};

  const isMessageDeleted = messageGlobalStatus === 'DELETED'

  if (isMessageDeleted) {
    return <ChatRoomMessageListItemContentDeleted />
  }

  switch (messageType) {
    case 'TEXT':
      return <ChatRoomMessageListItemContentString messageData={messageData} />;
    default:
      return null;
  }
}
