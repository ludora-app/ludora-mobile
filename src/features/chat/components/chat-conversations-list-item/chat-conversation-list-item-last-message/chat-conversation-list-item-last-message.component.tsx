import { ConversationCollectionResponseData } from '@/api/generated/model';

import ChatConversationListItemLastMessageEmpty from './chat-conversation-list-item-last-message-empty.component';
import ChatConversationListItemLastMessageString from './chat-conversation-list-item-last-message-string.component';

interface ChatConversationListItemLastMessageProps {
  conversation: ConversationCollectionResponseData;
}

export default function ChatConversationListItemLastMessage(props: ChatConversationListItemLastMessageProps) {
  const { conversation } = props || {};

  const { lastMessage } = conversation || {};
  const { type: lastMessageType } = lastMessage || {};

  switch (lastMessageType) {
    case 'TEXT':
      return <ChatConversationListItemLastMessageString conversation={conversation} />;
    default:
      return <ChatConversationListItemLastMessageEmpty />;
  }
}
