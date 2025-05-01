import COLORS from '@/constants/COLORS';
import SportsEnum from '@/constants/SPORTS';
import { Badge, cn, Icon, String, Box } from '@/components/chillUI';

export interface SessionCardProps {
  id: number;
  date: string;
  fieldName: string;
  sport: SportsEnum;
  fieldPrice: number;
  participants: number;
  maxParticipants: number;
}

export default function SessionCard({
  date,
  fieldName,
  fieldPrice,
  id,
  maxParticipants,
  participants,
  sport,
}: SessionCardProps) {
  return (
    <Box className="my-2 flex w-fit flex-row rounded-2xl border border-gray-200 bg-white p-4">
      <Box className="w-2/3">
        <Box className="flex flex-row justify-between">
          <String variant="dark" weight="bold" size="xl" numberOfLines={1}>
            {fieldName}
          </String>
        </Box>
        <Box className="flex flex-row items-center gap-1 py-2">
          <Icon variant="schedule" className={cn('h-4 w-4')} color={COLORS.ring} />
          <String variant="tertiary" weight="semiBold" size="xs">
            {date}
          </String>
        </Box>
        <Box className="flex flex-row items-center gap-1 py-2">
          <Icon variant="clock-regular" className={cn('h-4 w-4')} color={COLORS.ring} />
          <String variant="tertiary" weight="semiBold" size="xs">
            {date}
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
        <Badge title={sport} size="xs" />
        <String variant="dark" weight="semiBold" size="md">
          {fieldPrice} €
        </String>
      </Box>
    </Box>
  );
}
