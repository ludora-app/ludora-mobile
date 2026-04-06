import { memo } from 'react';
import { String } from '@ludo/ui';
import 'dayjs/locale/fr';

import { MessageCollectionItemDto } from '@/api/generated/model';
import { formatMessageTime } from '@/features/chat-room/utils/time';

type ChatRoomMessageListItemWrapperTimeProps = {
  messageData: MessageCollectionItemDto;
};

function ChatRoomMessageListItemWrapperTime({ messageData }: ChatRoomMessageListItemWrapperTimeProps) {
  const { createdAt } = messageData || {};
  return (
    <String variant="body-xs" colorVariant="muted" font="primarySemiBold">
      {formatMessageTime(createdAt)}
    </String>
  );
}

export default memo(ChatRoomMessageListItemWrapperTime);
