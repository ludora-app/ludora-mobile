import { Image } from 'react-native';
import COLORS from '@/constants/COLORS';
import { sportsColors, SportsEnum } from '@/constants/SPORTS';
import { Badge, Box, Card, CardContent, cn, Icon, String } from '@chillui/ui';

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
    <Card className="my-2 overflow-hidden p-0">
      <CardContent className="flex flex-1 flex-row p-0">
        <Box className="flex-1">
          <Image source={image} className="h-full w-full" resizeMode="cover" />
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
      </CardContent>
    </Card>
  );
}
