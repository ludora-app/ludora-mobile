import { String } from '@ludo/ui';

import { formatDate } from '@/utils/date.utils';
import { Message } from '@/features/chat-room/mocks/messages.mock';

type ChatRoomMessageListItemWrapperTimeProps = {
  messageData: Message;
};

export default function ChatRoomMessageListItemWrapperTime({ messageData }: ChatRoomMessageListItemWrapperTimeProps) {
  const { created_at } = messageData || {};
  return (
    <String variant="body-xs" colorVariant="muted">
      {formatDate({ date: created_at, format: 'HH:mm' })}
    </String>
  );
}
