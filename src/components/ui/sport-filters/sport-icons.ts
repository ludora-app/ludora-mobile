import { SportsEnum } from '@/constants/SPORTS';
import { ICONS, TIcons } from '@/constants/ICONS';

/**
 * @description Maps the sport icons used in the favoriteScreen's filter menu
 */
export const sportIcons = [
  {
    key: 'basketball-regular' as keyof TIcons,
    name: SportsEnum.BASKETBALL,
    ...ICONS['basketball-regular'],
  },
  {
    key: 'football-solid' as keyof TIcons,
    name: SportsEnum.FOOTBALL,
    ...ICONS['football-solid'],
  },
  {
    key: 'tennis-ball-regular' as keyof TIcons,
    name: SportsEnum.TENNIS,
    ...ICONS['tennis-ball-regular'],
  },
  {
    key: 'volleyball-regular' as keyof TIcons,
    name: SportsEnum.VOLLEYBALL,
    ...ICONS['volleyball-regular'],
  },
  {
    key: 'paddle-regular' as keyof TIcons,
    name: SportsEnum.PADDLE,
    ...ICONS['paddle-regular'],
  },
];

export default sportIcons;
