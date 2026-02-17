import { String } from '@ludo/ui';

import { formatDate } from '@/utils/date.utils';
import { MessageCollectionItemDto } from '@/api/generated/model';

type ChatRoomMessageListItemWrapperTimeProps = {
  messageData: MessageCollectionItemDto;
};

export default function ChatRoomMessageListItemWrapperTime({ messageData }: ChatRoomMessageListItemWrapperTimeProps) {
  const { createdAt } = messageData || {};
  return (
    <String variant="body-xs" colorVariant="muted">
      {formatDate({ date: createdAt, format: 'HH:mm' })}
    </String>
  );
}
