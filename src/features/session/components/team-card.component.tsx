import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Box, cn, Icon, String } from '@chillui/ui';

import ROUTES from '@/constants/ROUTES';

interface TeamCardComponentProps {
  id: number;
  name: string;
  sessionId: number;
  className?: string;
  playersCount: number;
  maxPlayerCount: number;
  players: {
    firstName: string;
    lastName: string;
    profilePic: string;
  }[];
}

export default function TeamCardComponent({
  className,
  id,
  maxPlayerCount,
  name,
  players,
  playersCount,
  sessionId,
}: TeamCardComponentProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      className={cn('my-2 flex rounded-lg p-4', className)}
      onPress={() => router.push(`${ROUTES.SESSION.TEAM}/${sessionId}`)}
    >
      <Box className="flex flex-row items-center justify-between gap-2">
        <String variant="white" weight="bold">
          Équipe {name}
        </String>
        <Box className="flex flex-row items-center gap-2">
          <Icon variant="group" color="white" />
          <String variant="white">
            {playersCount} / {maxPlayerCount}
          </String>
        </Box>
      </Box>
      <Box className="flex flex-row">
        {/* {players.map((player, index) => (
          <Avatar
            key={index}
            userData={{ firstname: player.firstName, image_url: player.profilePic, lastname: player.lastName }}
            className={cn(`z-${index}`, index !== 0 && '-ml-3')}
          />
        ))} */}
      </Box>
    </TouchableOpacity>
  );
}
