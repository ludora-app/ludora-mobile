import { memo } from 'react';
import COLORS from '@/constants/COLORS';
import { ImageBackground } from 'expo-image';
import { TouchableOpacity } from 'react-native';
import { Badge, Box, Icon, String } from '@chillUI';
import { formatDateLabel, formatToHour } from '@/utils/time';
import { sportsColors, SportsEnum } from '@/constants/SPORTS';

import useCalculateDistance from '../hooks/useCalculateDistance';

interface Session {
  id: string;
  title: string;
  notes: number;
  sport: string;
  image: string;
  endTime: string;
  latitude: number;
  startTime: string;
  longitude: number;
  currentPlayers: number;
  maximumPlayers: number;
}

function HomeSessionCard({ session }: { session: Session }) {
  const distance = useCalculateDistance({ latitude: session.latitude, longitude: session.longitude });

  return (
    <TouchableOpacity className="mb-5" onPress={() => {}}>
      <Box className="h-60 w-full overflow-hidden rounded-xl bg-transparent">
        <ImageBackground source={session.image} style={{ height: '100%', padding: 10, width: '100%' }}>
          <Badge title={session.title} size="sm" variant="white" className="self-start" />
        </ImageBackground>
      </Box>
      <Box className="flex items-start px-2">
        <Box className="mb-1 mt-3 flex w-full flex-row items-center justify-between">
          <Badge title={session.sport} variant={sportsColors.get(session.sport as SportsEnum)} />
          <Box className="flex flex-row items-center gap-1">
            <Icon variant="star-regular" color={COLORS.secondary} />
            <String size="lg" weight="semiBold" variant="gray">
              {session.notes}
            </String>
          </Box>
        </Box>
        <Box className="mb-1 flex flex-row items-center gap-2 pl-0.5">
          <Icon variant="calendar-regular" color={COLORS.gray} size="sm" />
          <String weight="semiBold" variant="gray">
            {formatDateLabel(session.startTime)}
          </String>
        </Box>
        <Box className="flex flex-row gap-5">
          <Box className="flex flex-row items-center gap-1">
            <Icon variant="location-solid" color={COLORS.gray} />
            <String weight="semiBold" variant="gray">
              {distance} km
            </String>
          </Box>
          <Box className="flex flex-row items-center gap-1">
            <Icon variant="user-regular" color={COLORS.gray} size="sm" />
            <String weight="semiBold" variant="gray">
              {session.currentPlayers}/{session.maximumPlayers}
            </String>
          </Box>
          <Box className="flex flex-row items-center gap-1">
            <Icon variant="clock-regular" color={COLORS.ring} size="sm" />
            <String weight="semiBold" variant="gray">
              {formatToHour(session.startTime)} - {formatToHour(session.endTime)}
            </String>
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
}

export default memo(HomeSessionCard);
