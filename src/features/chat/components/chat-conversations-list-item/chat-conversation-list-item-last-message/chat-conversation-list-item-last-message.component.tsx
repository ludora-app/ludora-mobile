import { ConversationCollectionResponseData } from '@/api/generated/model';

import ChatConversationListItemLastMessageEmpty from './chat-conversation-list-item-last-message-empty.component';
import ChatConversationListItemLastMessageString from './chat-conversation-list-item-last-message-string.component';
import ChatConversationListItemLastMessageFailed from './chat-conversation-list-item-last-message-failed.component';
import ChatConversationListItemLastMessageDeleted from './chat-conversation-list-item-last-message-deleted.component';

type ChatConversationListItemLastMessageProps = {
  conversation: ConversationCollectionResponseData;
}

export default function ChatConversationListItemLastMessage({ conversation }: ChatConversationListItemLastMessageProps) {
  const { lastMessage } = conversation || {};
  const { globalStatus: lastMessageGlobalStatus, type: lastMessageType } = lastMessage || {};

  const islastMessageDeleted = lastMessageGlobalStatus === 'DELETED';
  const islastMessageFailed = lastMessageGlobalStatus === 'FAILED' as any;

  if (islastMessageDeleted) {
    return <ChatConversationListItemLastMessageDeleted lastMessage={lastMessage} />;
  }

  if (islastMessageFailed) {
    return <ChatConversationListItemLastMessageFailed lastMessage={lastMessage} />;
  }



  switch (lastMessageType) {
    case 'TEXT':
      return <ChatConversationListItemLastMessageString conversation={conversation} />;
    default:
      return <ChatConversationListItemLastMessageEmpty />;
  }
}
