import { ConversationCollectionResponseData } from '@/api/generated/model';

import ChatConversationListItemAvatarPrivate from './chat-conversations-list-item-avatar-private.component';
import ChatConversationListItemAvatarSession from './chat-conversations-list-item-avatar-session.component';

interface ChatConversationListItemAvatarProps {
  conversation: ConversationCollectionResponseData;
}

export default function ChatConversationListItemAvatar({ conversation }: ChatConversationListItemAvatarProps) {
  const { type: conversationType } = conversation || {};

  switch (conversationType) {
    case 'PRIVATE':
      return <ChatConversationListItemAvatarPrivate conversation={conversation} />;
    case 'SESSION':
      return <ChatConversationListItemAvatarSession conversation={conversation} />;
    default:
      return null;
  }
}
