import { Href } from 'expo-router';

export type TabRouteNames = 'index' | 'favoris' | 'match' | 'messages' | 'profil';

export interface TabRoutes {
  href: Href;
  text: string;
  iconName: string;
  iconSize: number;
  name: TabRouteNames;
  iconNameActive: string;
}

export const TAB_ROUTES: TabRoutes[] = [
  {
    href: '/(root)/(tabs)',
    iconName: 'loupe',
    iconNameActive: 'loupe',
    iconSize: 24,
    name: 'index',
    text: 'explorer',
  },
  {
    href: '/(root)/(tabs)/welcome',
    iconName: 'heart-regular',
    iconNameActive: 'heart-solid',
    iconSize: 22,
    name: 'favoris',
    text: 'Favoris',
  },
  {
    href: '/(root)/(tabs)/match',
    iconName: 'basketball-regular',
    iconNameActive: 'basketball-solid',
    iconSize: 24,
    name: 'match',
    text: 'Match',
  },
  {
    href: '/(root)/(tabs)/messages',
    iconName: 'message-regular',
    iconNameActive: 'message-solid',
    iconSize: 24,
    name: 'messages',
    text: 'Messages',
  },
  {
    href: '/(root)/(tabs)/profil',
    iconName: 'user-regular',
    iconNameActive: 'user-solid',
    iconSize: 24,
    name: 'profil',
    text: 'Profil',
  },
];
