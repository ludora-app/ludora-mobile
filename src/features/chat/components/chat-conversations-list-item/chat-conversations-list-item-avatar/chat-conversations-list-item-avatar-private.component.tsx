import { Avatar } from '@ludo/ui';

import { ConversationCollectionResponseData } from '@/api/generated/model';

interface ChatConversationListItemAvatarPrivateProps {
  conversation: ConversationCollectionResponseData;
}

export default function ChatConversationListItemAvatarPrivate({
  conversation,
}: ChatConversationListItemAvatarPrivateProps) {
  const { imageUrl, name } = conversation || {};

  return (
    <Avatar
      data={{
        firstname: name,
        imageUrl,
      }}
    />
  );
}
