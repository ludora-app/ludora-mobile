import { Icon, BoxRow } from '@ludo/ui';
import { LoadingIndicator } from '@chillui/ui';

import COLORS from '@/constants/COLORS';
import { MessageCollectionItemDto } from '@/api/generated/model';

interface ChatRoomMessageListItemWrapperIndicatorsProps {
  messageData: MessageCollectionItemDto;
}

export default function ChatRoomMessageListItemWrapperIndicators({
  messageData,
}: ChatRoomMessageListItemWrapperIndicatorsProps) {
  const { isMe: isMessageFromMe, isRead, isReadByAll, isSending } = messageData || {};

  if (!isMessageFromMe) {
    return null;
  }

  if (isSending) {
    return <LoadingIndicator color={COLORS.muted} size="2xs" name="swing" />;
  }
  if (!isSending && !isRead && !isReadByAll) {
    return <Icon name="check-solid" size="xs" color={COLORS.muted} />;
  }

  if ((isRead || isReadByAll) && !isSending) {
    return (
      <BoxRow className="flex-row items-center">
        <Icon name="check-solid" size="xs" color={isReadByAll ? COLORS.primary : COLORS.muted} />
        <Icon name="check-solid" size="xs" className="-ml-2" color={isReadByAll ? COLORS.primary : COLORS.muted} />
      </BoxRow>
    );
  }
}
