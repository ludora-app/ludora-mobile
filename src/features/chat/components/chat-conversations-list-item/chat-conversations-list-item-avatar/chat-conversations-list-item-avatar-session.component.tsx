import { Avatar, Box, Image } from '@ludo/ui';

import { getSportImage } from '@/utils/sports.utils';
import { ConversationCollectionResponseData } from '@/api/generated/model';

interface ChatConversationListItemAvatarSessionProps {
  conversation: ConversationCollectionResponseData;
}

export default function ChatConversationListItemAvatarSession({
  conversation,
}: ChatConversationListItemAvatarSessionProps) {
  const { imageUrl, name, sport } = conversation || {};

  const sportImage = getSportImage(sport);

  return (
    <Box>
      <Avatar
        data={{
          firstname: name,
          imageUrl,
        }}
      />
      <Image source={sportImage} className="absolute right-0 bottom-0 size-6" />
    </Box>
  );
}
