import ROUTES from '@/constants/ROUTES';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Box, Icon, String } from '@/components/chillUI';

interface TeamCardComponentProps {
  id: number;
  name: string;
  className?: string;
  playersCount: number;
  maxPlayerCount: number;
}

export default function TeamCardComponent({
  className,
  id,
  maxPlayerCount,
  name,
  playersCount,
}: TeamCardComponentProps) {
  const router = useRouter();

  return (
    <Box className={`flex rounded-lg p-4 ${className}`}>
      <TouchableOpacity className="my-2" onPress={() => router.push(`${ROUTES.SESSION.TEAM}/${id}`)}>
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
        <Box className="flex flex-row items-center justify-between gap-2">
          <String variant="white">ici vont les icones</String>
        </Box>
      </TouchableOpacity>
    </Box>
  );
}
