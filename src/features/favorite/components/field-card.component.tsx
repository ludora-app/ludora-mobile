import { View } from '@/components/chillUI/box/View';
import { cn, Icon, Image, String } from '@/components/chillUI';
import COLORS from '@/constants/COLORS';
import { SportsEnum } from '@/constants/SPORTS';
import SportTag from '@/components/chillUI/sport-tags/components/sport-tags.component';

export interface FieldCardProps {
  id: number;
  image: any;
  name: string;
  price: number;
  location: string;
  rating: number;
  reviews: number;
  isFavorite: boolean;
  sports: SportsEnum[];
}

/**
 * @description Component displaying a field card, used in the favorite screen
 */
export default function FieldCard({
  id,
  image,
  name,
  price,
  location,
  rating,
  reviews,
  isFavorite,
  sports,
}: FieldCardProps) {
  return (
    <View className="border-1 my-2 flex w-fit flex-row rounded-2xl border border-gray-200 bg-white">
      <View className="flex-1 overflow-hidden rounded-l-2xl">
        <Image source={image} className="flex-1" contentFit="cover" />
      </View>
      <View className="flex w-2/3 flex-col p-2">
        <View className="my-2 flex flex-row flex-wrap gap-1">
          {sports.map(sport => (
            <SportTag key={sport} sport={sport} />
          ))}
        </View>
        <String variant="dark" weight="bold" size="xl">
          {name}
        </String>
        <View className="flex flex-row items-center">
          <Icon variant="location-solid" color={COLORS.ring} />
          <String variant="dark" weight="semiBold" size="2xs">
            {location}
          </String>
        </View>
        <View className="flex flex-row items-center gap-1">
          <Icon variant="star-regular" color={COLORS.secondary} className={cn('h-4 w-4')} />
          <String variant="dark" weight="semiBold" size="sm">
            {rating}
          </String>
          <String variant="dark" weight="semiBold" size="xs">
            - {reviews} Commentaires
          </String>
        </View>
      </View>
    </View>
  );
}
