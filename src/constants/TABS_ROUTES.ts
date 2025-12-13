import { Href } from 'expo-router';

import { TIconsAll } from './ICONS';

export type TabRouteNames = 'index' | 'messages' | 'favoris' | 'match' | 'planning' | 'profil';

export interface TabRoutes {
  href: Href;
  text: string;
  name: TabRouteNames;
  iconName: TIconsAll;
  iconNameActive: TIconsAll;
}

export const TAB_ROUTES: TabRoutes[] = [
  {
    href: '/(root)/(tabs)/',
    iconName: 'flash-regular',
    iconNameActive: 'flash-solid',
    name: 'index',
    text: '',
  },
  {
    href: '/(root)/(tabs)/messages',
    iconName: 'conversation-box-regular',
    iconNameActive: 'conversation-box-solid',
    name: 'messages',
    text: 'tab.messages',
  },
  {
    href: '/(root)/(tabs)/match',
    iconName: 'search-regular',
    iconNameActive: 'search-solid',
    name: 'match',
    text: 'tab.matches',
  },

  {
    href: '/(root)/(tabs)/planning',
    iconName: 'calendar-regular',
    iconNameActive: 'calendar-solid',
    name: 'planning',
    text: 'tab.planning',
  },
  {
    href: '/(root)/(tabs)/profil',
    iconName: 'ludo-regular',
    iconNameActive: 'ludo-solid',
    name: 'profil',
    text: 'tab.profile',
  },
];
