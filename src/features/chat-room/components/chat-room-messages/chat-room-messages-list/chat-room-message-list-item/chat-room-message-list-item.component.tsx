

import { memo } from 'react';

import { MessageCollectionItemDto } from '@/api/generated/model';
import { OptimisticMessage } from '@/features/chat-room/store/chat-room-optimistic-messages.store';

import ChatRoomMessageListItemWrapper from './chat-room-messafe-list-item-wrapper/chat-room-message-list-item-wrapper.component';
import ChatRoomMessageListItemContent from './chat-room-messages-list-item-content/chat-room-message-list-item-content.component';

interface ChatRoomMessageListItemProps {
  isChatRoomGroup: boolean;
  item: OptimisticMessage | MessageCollectionItemDto;
}

function ChatRoomMessageListItem(porps: ChatRoomMessageListItemProps) {
  const { isChatRoomGroup, item: messageData } = porps || {};

  return (
    <ChatRoomMessageListItemWrapper messageData={messageData} isChatRoomGroup={isChatRoomGroup}>
      <ChatRoomMessageListItemContent messageData={messageData} />
    </ChatRoomMessageListItemWrapper>
  );
}


export default memo(ChatRoomMessageListItem, (prevProps, nextProps) => {
  const prevItem = prevProps.item as any;
  const nextItem = nextProps.item as any;

  return (
    prevItem.hasAnyRead === nextItem.hasAnyRead &&
    prevItem.hasEveryoneRead === nextItem.hasEveryoneRead &&
    prevItem.isSending === nextItem.isSending &&
    prevItem.isError === nextItem.isError &&
    prevItem.uid === nextItem.uid &&
    prevItem.globalStatus === nextItem.globalStatus
  );
});
