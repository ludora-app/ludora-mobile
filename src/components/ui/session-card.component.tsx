import COLORS from '@/constants/COLORS';
import { useRouter } from 'expo-router';
import ROUTES from '@/constants/ROUTES';
import { formatDate, formatHour } from '@/utils/date.utils';
import { sportsColors, SportsEnum } from '@/constants/SPORTS';
import { Badge, cn, Icon, String, Box, Card, CardContent } from '@/components/chillUI';

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
    <Card className="my-2" onPress={() => router.push(`${ROUTES.SESSION.DETAILS}/${id}`)}>
      <CardContent className="p-5">
        <Box className="flex flex-row items-center justify-between gap-2">
          <Box className="flex-1">
            <String variant="dark" weight="bold" size="xl" numberOfLines={1}>
              {fieldName}
            </String>
          </Box>
          <Badge title={sport} variant={sportsColors.get(sport)} />
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
        <Box className="flex flex-row items-center justify-between">
          <Box className="flex flex-row items-center gap-1 py-2">
            <Icon variant="user-regular" className={cn('h-4 w-4')} color={COLORS.ring} />
            <String variant="tertiary" weight="semiBold" size="xs">
              {participants} / {maxParticipants}
            </String>
          </Box>
          <String variant="dark" weight="semiBold" size="md">
            {fieldPrice} €
          </String>
        </Box>
      </CardContent>
    </Card>
  );
}
