import { cn } from '@chillui/ui';
import { Box, BoxRow } from '@ludo/ui';
import { PropsWithChildren } from 'react';

import { MessageCollectionItemDto } from '@/api/generated/model';
import { useChatRoomStore } from '@/features/chat-room/store/chat-room.store';
import { OptimisticMessage } from '@/features/chat-room/store/chat-room-optimistic-messages.store';
import {
  MessageActionsAnchorRect,
  useChatRoomMessageActionsMenuStore,
} from '@/features/chat-room/store/chat-room-message-actions-menu.store';

import ChatRoomMessageListItemWrapperTime from './chat-room-message-list-item-wrapper-time.component';
import ChatRoomMessageListItemWrapperAvatar from './chat-room-message-list-item-wrapper-avatar.component';
import ChatRoomMessageListItemWrapperBubble from './chat-room-message-list-item-wrapper-bubble.component';
import ChatRoomMessageListItemWrapperIndicators from './chat-room-message-list-item-wrapper-indicators/chat-room-message-list-item-wrapper-indicators.component';

type ChatRoomMessageListItemWrapperProps = {
  isChatRoomGroup: boolean;
  messageData: OptimisticMessage | MessageCollectionItemDto;
};

export default function ChatRoomMessageListItemWrapper(props: PropsWithChildren<ChatRoomMessageListItemWrapperProps>) {
  const chatRoomId = useChatRoomStore(state => state.chatRoomId);
  const { children, isChatRoomGroup, messageData } = props;
  const { globalStatus: messageGlobalStatus, isSender: isMessageFromMe, uid: messageUid } = messageData || {};

  const setMessageActionsAnchor = useChatRoomMessageActionsMenuStore(state => state.setAnchor);

  const isMessageDeleted = messageGlobalStatus === 'DELETED';

  const handleBubbleAnchorMeasured = (rect: MessageActionsAnchorRect) => {
    if (!chatRoomId || !messageUid || isMessageDeleted) {
      return;
    }
    setMessageActionsAnchor(rect);
  };

  return (
    <Box
      className={cn(
        {
          'items-end': isMessageFromMe,
          'items-start': !isMessageFromMe,
        },
        'mb-3',
      )}
    >
      <Box className="max-w-[80%]">
        <BoxRow
          className={cn('items-end gap-1', {
            'flex-row-reverse justify-start': isMessageFromMe,
            'justify-start': !isMessageFromMe,
          })}
        >
          {isChatRoomGroup && <ChatRoomMessageListItemWrapperAvatar messageData={messageData} />}
          <ChatRoomMessageListItemWrapperBubble
            messageData={messageData}
            onBubbleAnchorMeasured={handleBubbleAnchorMeasured}
          >
            {children}
          </ChatRoomMessageListItemWrapperBubble>
        </BoxRow>
        <BoxRow className={cn('items-center justify-end gap-px')}>
          <ChatRoomMessageListItemWrapperTime messageData={messageData} />
          <ChatRoomMessageListItemWrapperIndicators messageData={messageData} />
        </BoxRow>
      </Box>
    </Box>
  );
}

