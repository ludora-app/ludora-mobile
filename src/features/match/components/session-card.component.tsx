import { cn, Icon, String } from '@/components/chillUI';
import { View } from '@/components/chillUI/box/View';
import SportTag from '@/components/chillUI/sport-tags/components/sport-tags.component';
import COLORS from '@/constants/COLORS';
import { SportsEnum } from '@/constants/SPORTS';

export interface SessionCardProps {
  id: number;
  fieldName: string;
  fieldPrice: number;
  date: string;
  participants: number;
  maxParticipants: number;
  sport: SportsEnum;
}

export default function SessionCard({
  id,
  fieldName,
  fieldPrice,
  date,
  participants,
  maxParticipants,
  sport,
}: SessionCardProps) {
  return (
    <View className="border-1 my-2 flex w-fit flex-row rounded-2xl border border-gray-200 bg-white p-4">
      <View className="w-2/3">
        <View className="flex flex-row justify-between">
          <String variant="dark" weight="bold" size="xl">
            {fieldName}
          </String>
        </View>
        <View className="flex flex-row items-center gap-1 py-2">
          <Icon variant="schedule" className={cn('h-4 w-4')} color={COLORS.ring} />
          <String variant="tertiary" weight="semiBold" size="xs">
            {date}
          </String>
        </View>
        <View className="flex flex-row items-center gap-1 py-2">
          <Icon variant="clock-regular" className={cn('h-4 w-4')} color={COLORS.ring} />
          <String variant="tertiary" weight="semiBold" size="xs">
            {date}
          </String>
        </View>
        <View className="flex flex-row items-center gap-1 py-2">
          <Icon variant="user-regular" className={cn('h-4 w-4')} color={COLORS.ring} />
          <String variant="tertiary" weight="semiBold" size="xs">
            {participants} / {maxParticipants}
          </String>
        </View>
      </View>
      <View className="flex-1 items-end justify-between px-2">
        <SportTag sport={sport} />
        <String variant="dark" weight="semiBold" size="md">
          {fieldPrice} €
        </String>
      </View>
    </View>
  );
}
