import { String } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';


export default function ChatConversationListItemLastMessageEmpty() {
  const { t } = useTranslate();

  return (
    <String variant="body-sm" colorVariant='muted' truncate >
      {t("chat.list_empty_title")}
    </String>
  );
}
