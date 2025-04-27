import COLORS from '@/constants/COLORS';
import { SportsEnum } from '@/constants/SPORTS';

/**
 * @description Get the color of a sport
 * @param sport - The sport to get the color of
 * @returns The color of the sport
 */
export const getSportColor = (sport: SportsEnum) => {
  switch (sport) {
    case SportsEnum.FOOTBALL:
      return COLORS.purplePrimary;
    case SportsEnum.BASKETBALL:
      return COLORS.primary;
    case SportsEnum.TENNIS:
      return COLORS.secondary;
    case SportsEnum.VOLLEYBALL:
      return COLORS.bluePrimary;
    case SportsEnum.PADDLE:
      return COLORS.purpleSecondary;
    default:
      return COLORS.purpleTertiary;
  }
};
