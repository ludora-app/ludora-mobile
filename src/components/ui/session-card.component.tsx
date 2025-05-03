import COLORS from '@/constants/COLORS';
import { useRouter } from 'expo-router';
import ROUTES from '@/constants/ROUTES';
import { TouchableOpacity } from 'react-native';
import { formatDate, formatHour } from '@/utils/date.utils';
import { sportsColors, SportsEnum } from '@/constants/SPORTS';
import { Badge, cn, Icon, String, Box } from '@/components/chillUI';

export interface SessionCardProps {
  id: number;
  endDate: string;
  startDate: string;
  fieldName: string;
  sport: SportsEnum;
  fieldPrice: number;
  participants: number;
  maxParticipants: number;
}

export default function SessionCard({
  endDate,
  fieldName,
  fieldPrice,
  id,
  maxParticipants,
  participants,
  sport,
  startDate,
}: SessionCardProps) {
  const router = useRouter();

  return (
    <Box>
      <TouchableOpacity
        className="border-1 my-2 flex w-full flex-row rounded-2xl border border-gray bg-white p-4"
        onPress={() => router.push(`${ROUTES.SESSION.DETAILS}/${id}`)}
      >
        <Box className="w-2/3">
          <Box className="flex flex-row justify-between">
            <String variant="dark" weight="bold" size="xl" numberOfLines={1}>
              {fieldName}
            </String>
          </Box>
          <Box className="flex flex-row items-center gap-1 py-2">
            <Icon variant="schedule" className={cn('h-4 w-4')} color={COLORS.ring} />
            <String variant="tertiary" weight="semiBold" size="xs">
              {formatDate(startDate)}
            </String>
          </Box>
          <Box className="flex flex-row items-center gap-1 py-2">
            <Icon variant="clock-regular" className={cn('h-4 w-4')} color={COLORS.ring} />
            <String variant="tertiary" weight="semiBold" size="xs">
              {formatHour(startDate)} - {formatHour(endDate)}
            </String>
          </Box>
          <Box className="flex flex-row items-center gap-1 py-2">
            <Icon variant="user-regular" className={cn('h-4 w-4')} color={COLORS.ring} />
            <String variant="tertiary" weight="semiBold" size="xs">
              {participants} / {maxParticipants}
            </String>
          </Box>
        </Box>
        <Box className="flex-1 items-end justify-between px-2">
          <Badge title={sport} variant={sportsColors.get(sport)} />
          <String variant="dark" weight="semiBold" size="md">
            {fieldPrice} €
          </String>
        </Box>
      </TouchableOpacity>
    </Box>
  );
}
