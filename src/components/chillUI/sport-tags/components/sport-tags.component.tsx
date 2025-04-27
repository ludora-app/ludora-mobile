import { View } from '../../box/View';
import String from '../../string/components/String';
import { SportsEnum } from '@/constants/SPORTS';
import { getSportColor } from '../utils/sport-tags.utils';

interface SportTagProps {
  sport: SportsEnum;
}

/**
 * @description Component displaying a sport tag
 * @param sport - The sport to display
 * @returns A sport tag with a background color corresponding to the sport
 */
export default function SportTag({ sport }: SportTagProps) {
  const backgroundColor = getSportColor(sport);

  return (
    <View className="rounded-full px-2 py-1" style={{ backgroundColor }}>
      <String variant="white" weight="semiBold" size="xs">
        {sport}
      </String>
    </View>
  );
}
