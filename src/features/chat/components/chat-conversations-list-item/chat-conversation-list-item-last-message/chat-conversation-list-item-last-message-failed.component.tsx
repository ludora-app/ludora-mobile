import { BoxRow, Icon, String } from '@ludo/ui';

import COLORS from '@/constants/COLORS';
import { ConversationCollectionResponseDataLastMessage } from '@/api/generated/model';

type ChatConversationListItemLastMessageFailedProps = {
  lastMessage: ConversationCollectionResponseDataLastMessage;
}

export default function ChatConversationListItemLastMessageFailed({ lastMessage }: ChatConversationListItemLastMessageFailedProps) {
  const { content } = lastMessage || {};

  return (
    <BoxRow className='gap-1'>
      <Icon name="warning-regular" size="xs" color={COLORS.muted} />
      <String variant="body-sm" colorVariant="muted" truncate font="primaryRegular">
        {content}
      </String>
    </BoxRow>

  )
}