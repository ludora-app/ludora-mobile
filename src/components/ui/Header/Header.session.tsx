import { useRouter } from 'expo-router';
import COLORS from '@/constants/COLORS';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground } from 'expo-image';
import { TouchableOpacity } from 'react-native';
import { welcomeScreenImageBackground } from 'assets';
import { Badge, Box, Icon } from '@/components/chillUI';
import { GameModesEnum, SportsEnum } from '@/constants/SPORTS';

export interface HeaderSessionProps {
  sport: SportsEnum;
  gameMode: GameModesEnum;
}

export default function HeaderSession({ gameMode, sport }: HeaderSessionProps) {
  const router = useRouter();

  return (
    <ImageBackground source={welcomeScreenImageBackground} className="h-250 flex-1">
      <StatusBar />
      <Box className="flex flex-row justify-between px-10 py-20">
        <Box>
          <TouchableOpacity onPress={() => router.back()} className="rounded-3xl bg-white p-2">
            <Icon variant="arrow-left-solid" color={COLORS.ring} />
          </TouchableOpacity>
        </Box>
        <Box className="flex flex-row gap-2">
          <TouchableOpacity className="rounded-3xl bg-white p-2">
            <Icon variant="share-nodes-regular" color={COLORS.ring} />
          </TouchableOpacity>
          <TouchableOpacity className="rounded-3xl bg-white p-2">
            <Icon variant="heart-regular" color={COLORS.ring} />
          </TouchableOpacity>
        </Box>
      </Box>
      <Box className="flex flex-row gap-2 px-10">
        <Badge title={sport} size="sm" />
        <Badge title={gameMode} size="sm" />
      </Box>
    </ImageBackground>
  );
}
