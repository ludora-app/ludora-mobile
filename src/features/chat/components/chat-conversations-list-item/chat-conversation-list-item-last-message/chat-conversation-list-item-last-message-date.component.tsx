import { Box, String } from '@ludo/ui';

import { ConversationCollectionResponseData } from '@/api/generated/model';

import { isMessageRead } from '../../../utils/chat.utils';
import { formatChatTimestamp } from '../../../utils/date.utils';

interface ChatConversationListItemLastMessageDateProps {
  conversation: ConversationCollectionResponseData;
}

export default function ChatConversationListItemLastMessageDate({
  conversation,
}: ChatConversationListItemLastMessageDateProps) {
  const { createdAt: lastMessageAt } = conversation?.lastMessage || {};

  const isLastMessageRead = isMessageRead(conversation);

  if (!lastMessageAt) {
    return null;
  }

  return (
    <Box>
      <String
        variant="body-sm"
        colorVariant={isLastMessageRead ? 'muted' : 'dark'}
        font={isLastMessageRead ? 'primaryRegular' : 'primaryBold'}
      >
        {formatChatTimestamp(lastMessageAt)}
      </String>
    </Box>
  );
}
