import { useMemo } from 'react';
import { ImageSource } from 'expo-image';
import { Avatar, Box, Image } from '@ludo/ui';

import { getSportImage, getSportPlaceHolder } from '@/utils/sports.utils';
import { ConversationCollectionResponseData } from '@/api/generated/model';

interface ChatConversationListItemAvatarSessionProps {
  conversation: ConversationCollectionResponseData;
}

export default function ChatConversationListItemAvatarSession({
  conversation,
}: ChatConversationListItemAvatarSessionProps) {
  const { imageUrl, name, sessionData } = conversation || {};

  const { sport, teamLabel } = sessionData || {};

  const sessionImage = useMemo(() => {
    if (imageUrl) return { uri: imageUrl };
    if (sport) return getSportPlaceHolder(sport);
    return undefined;
  }, [imageUrl, sport]) as ImageSource | undefined;

  return (
    <Box>
      <Avatar
        data={{
          firstname: name ?? '',
          imageUrl: sessionImage,
        }}
        colorVariant={teamLabel === 'B' ? 'secondary' : 'primary'}
      />
      {sport && <Image source={getSportImage(sport)} className="absolute right-0 bottom-0 size-6" />}
    </Box>
  );
}
