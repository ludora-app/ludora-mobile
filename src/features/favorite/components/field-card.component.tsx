import COLORS from '@/constants/COLORS';
import { sportsColors, SportsEnum } from '@/constants/SPORTS';
import { Badge, Box, cn, Icon, Image, String } from '@/components/chillUI';

export interface FieldCardProps {
  // id: number;
  image: any;
  name: string;
  // price: number;
  rating: number;
  reviews: number;
  location: string;
  // isFavorite: boolean;
  sports: SportsEnum[];
}

/**
 * @description Component displaying a field card, used in the favorite screen
 */
export default function FieldCard({ image, location, name, rating, reviews, sports }: FieldCardProps) {
  return (
    <Box className="border-gray-200 my-2 flex w-fit flex-row rounded-2xl border bg-white">
      <Box className="flex-1 overflow-hidden rounded-l-2xl">
        <Image source={image} className="flex-1" contentFit="cover" />
      </Box>
      <Box className="flex w-2/3 flex-col p-2">
        <Box className="my-2 flex flex-row flex-wrap gap-1">
          {sports.map(sport => (
            <Badge key={sport} title={sport} variant={sportsColors.get(sport)} size="xs" />
          ))}
        </Box>
        <String variant="dark" weight="bold" size="xl" numberOfLines={1}>
          {name}
        </String>
        <Box className="flex flex-row items-center">
          <Icon variant="location-solid" color={COLORS.ring} />
          <String variant="dark" weight="semiBold" size="2xs" numberOfLines={1}>
            {location}
          </String>
        </Box>
        <Box className="flex flex-row items-center gap-1">
          <Icon variant="star-regular" color={COLORS.secondary} className={cn('h-4 w-4')} />
          <String variant="dark" weight="semiBold" size="sm">
            {rating}
          </String>
          <String variant="dark" weight="semiBold" size="xs">
            - {reviews} Commentaires
          </String>
        </Box>
      </Box>
    </Box>
  );
}
