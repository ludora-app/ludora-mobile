import { Box, BoxRow } from '@ludo/ui';
import { PropsWithChildren } from 'react';
import { BoxCenter, cn } from '@chillui/ui';

import { Message } from '@/features/chat-room/mocks/messages.mock';

import ChatRoomMessageListItemWrapperTime from './chat-room-message-list-item-wrapper-time.component';
import ChatRoomMessageListItemWrapperAvatar from './chat-room-message-list-item-wrapper-avatar.component';
import ChatRoomMessageListItemWrapperIndicators from './chat-room-message-list-item-wrapper-indicators.component';

type ChatRoomMessageListItemWrapperProps = {
  messageData: Message;
};

export default function ChatRoomMessageListItemWrapper(props: PropsWithChildren<ChatRoomMessageListItemWrapperProps>) {
  const { children, messageData } = props;
  const { isMe: isMessageFromMe } = messageData || {};

  return (
    <Box className={cn(isMessageFromMe ? 'items-end' : 'items-start', 'mb-3')}>
      <Box className="max-w-[80%]">
        <BoxRow className="items-center justify-end gap-1">
          <ChatRoomMessageListItemWrapperAvatar messageData={messageData} />
          <BoxCenter className={cn('rounded-lg p-2', isMessageFromMe ? 'bg-primary' : 'bg-ring')}>{children}</BoxCenter>
        </BoxRow>
        <BoxRow className={cn('items-center justify-end gap-px')}>
          <ChatRoomMessageListItemWrapperTime messageData={messageData} />
          <ChatRoomMessageListItemWrapperIndicators messageData={messageData} />
        </BoxRow>
      </Box>
    </Box>
  );
}
