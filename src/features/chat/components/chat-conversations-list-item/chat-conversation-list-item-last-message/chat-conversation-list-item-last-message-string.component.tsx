import { String } from '@ludo/ui';

import { isMessageRead } from '@/features/chat/utils/chat.utils';
import { ConversationCollectionResponseData } from '@/api/generated/model';

interface ChatConversationListItemLastMessageStringProps {
  conversation: ConversationCollectionResponseData;
}

export default function ChatConversationListItemLastMessageString(
  props: ChatConversationListItemLastMessageStringProps,
) {
  const { conversation } = props;
  const { lastMessage, sender, type } = conversation || {};
  const { content: lastMessageContent } = lastMessage || {};
  const { firstname: senderFirstName } = sender || {};


  const isLastMessageRead = isMessageRead(conversation);

  const isGroupChat = type === 'GROUP' || type === 'SESSION';

  return (
    <String
      variant="body-sm"
      colorVariant={isLastMessageRead ? 'muted' : 'dark'}
      truncate
      font={isLastMessageRead ? 'primaryRegular' : 'primaryBold'}
    >
      {isGroupChat ? `${senderFirstName}: ` : ''} {lastMessageContent}
    </String>
  );
}
