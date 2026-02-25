import { Icon, BoxRow } from '@ludo/ui';
import { LoadingIndicator } from '@chillui/ui';

import COLORS from '@/constants/colors.contstants';
import { MessageCollectionItemDto } from '@/api/generated/model';
import { OptimisticMessage } from '@/features/chat-room/store/chat-room-optimistic-messages.store';




interface ChatRoomMessageListItemWrapperIndicatorsProps {
  messageData: OptimisticMessage | MessageCollectionItemDto;
}

export default function ChatRoomMessageListItemWrapperIndicators({
  messageData,
}: ChatRoomMessageListItemWrapperIndicatorsProps) {

  const { hasAnyRead, hasEveryoneRead, isError, isSender: isMessageFromMe, isSending } = messageData as OptimisticMessage || {};


  if (!isMessageFromMe) {
    return null;
  }
  if (isError) {
    return <Icon name='warning-solid' size="xs" color={COLORS.destructive} />;
  }

  if (isSending) {
    return <LoadingIndicator color={COLORS.muted} size="2xs" name="swing" />;
  }
  if (!isSending && !hasAnyRead && !hasEveryoneRead) {
    return <Icon name="check-solid" size="xs" color={COLORS.muted} />;
  }

  if ((hasAnyRead || hasEveryoneRead) && !isSending) {
    return (
      <BoxRow className="flex-row items-center">
        <Icon name="check-solid" size="xs" color={hasEveryoneRead ? COLORS.primary : COLORS.muted} />
        <Icon name="check-solid" size="xs" className="-ml-2" color={hasEveryoneRead ? COLORS.primary : COLORS.muted} />
      </BoxRow>
    );
  }
}
