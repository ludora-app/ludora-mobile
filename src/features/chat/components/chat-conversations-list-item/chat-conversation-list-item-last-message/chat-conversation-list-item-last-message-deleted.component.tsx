import { useTranslate } from '@tolgee/react';
import { BoxRow, Icon, String } from '@ludo/ui';

import COLORS from '@/constants/colors.contstants';
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
        {isSender ?
          t('chat.conversation_list_item_last_message_deleted.you_deleted_message')
          :
          t('chat.conversation_list_item_last_message_deleted.message_deleted')
        }
      </String>
    </BoxRow>

  )
}