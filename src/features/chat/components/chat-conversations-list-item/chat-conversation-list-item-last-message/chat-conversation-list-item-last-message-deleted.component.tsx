import { useTranslate } from '@tolgee/react';
import { BoxRow, Icon, String } from '@ludo/ui';

import COLORS from '@/constants/COLORS';
import { ConversationCollectionResponseDataLastMessage } from '@/api/generated/model';

type ChatConversationListItemLastMessageDeletedProps = {
  lastMessage: ConversationCollectionResponseDataLastMessage;
}

export default function ChatConversationListItemLastMessageDeleted({ lastMessage }: ChatConversationListItemLastMessageDeletedProps) {
  const { t } = useTranslate();
  const { isSender } = lastMessage || {};

  return (
    <BoxRow className='gap-1'>
      <Icon name="trash-bin-regular" size="xs" color={COLORS.muted} />
      <String variant="body-sm" colorVariant="muted" truncate font="primaryRegular">
        {isSender ? "Tu as supprimé ce message" : "Le message a été supprimé"}
      </String>
    </BoxRow>

  )
}