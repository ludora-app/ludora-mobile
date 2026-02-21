import { Avatar, Box, Image } from '@ludo/ui';

import { getSportImage } from '@/utils/sports.utils';
import { ConversationCollectionResponseData } from '@/api/generated/model';

interface ChatConversationListItemAvatarSessionProps {
  conversation: ConversationCollectionResponseData;
}

export default function ChatConversationListItemAvatarSession({
  conversation,
}: ChatConversationListItemAvatarSessionProps) {
  const { imageUrl, name, sessionData } = conversation || {};

  const { sport, teamLabel } = sessionData || {};

  const sportImage = getSportImage(sport);

  return (
    <Box>
      <Avatar
        data={{
          firstname: name,
          imageUrl,
        }}
        colorVariant={teamLabel === "B" ? "secondary" : "primary"}
      />
      <Image source={sportImage} className="absolute right-0 bottom-0 size-6" />
    </Box>
  );
}
