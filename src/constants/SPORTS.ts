import { VariantProps } from 'tailwind-variants';
import backgroundVariants from '@/components/chillUI/badge/utils/styleVariants';

/**
 * @description Enum for uniformizing the name of sports, for use in components
 */
enum SportsEnum {
  FOOTBALL = 'Football',
  BASKETBALL = 'Basketball',
  VOLLEYBALL = 'Volleyball',
  TENNIS = 'Tennis',
  PADDLE = 'Paddle',
}

const sportsColors: Map<SportsEnum, VariantProps<typeof backgroundVariants>['variant']> = new Map([
  [SportsEnum.BASKETBALL, 'primary'],
  [SportsEnum.FOOTBALL, 'secondary'],
  [SportsEnum.PADDLE, 'bluePrimary'],
  [SportsEnum.TENNIS, 'destructive'],
  [SportsEnum.VOLLEYBALL, 'purplePrimary'],
]);

enum GameModesEnum {
  FIVE_VS_FIVE = '5v5',
  TWO_VS_TWO = '2v2',
  THREE_VS_THREE = '3v3',
  FOUR_VS_FOUR = '4v4',
  SIX_VS_SIX = '6v6',
  EIGHT_VS_EIGHT = '8v8',
  TEN_VS_TEN = '10v10',
  TWELVE_VS_TWELVE = '12v12',
  ELEVEN_VS_ELEVEN = '11v11',
}

export { GameModesEnum, SportsEnum, sportsColors };
