import { Href } from 'expo-router';

import { TIconsAll } from './icons.constants';

export type TabRouteNames = 'index' | 'messages' | 'players' | 'profil' | 'create-session';

export interface TabRoutes {
  href: Href;
  text: string;
  name: TabRouteNames;
  iconName: TIconsAll;
  iconNameActive: TIconsAll;
}

export const TAB_ROUTES: TabRoutes[] = [
  {
    href: '/(root)/(tabs)/create-session',
    iconName: 'flash-regular',
    iconNameActive: 'flash-solid',
    name: 'create-session',
    text: '',
  },
  {
    href: '/(root)/(tabs)/',
    iconName: 'search-regular',
    iconNameActive: 'search-regular',
    name: 'index',
    text: 'tab.explore',
  },
  {
    href: '/(root)/(tabs)/players',
    iconName: 'user-search',
    iconNameActive: 'user-search',
    name: 'players',
    text: 'tab.players',
  },

  {
    href: '/(root)/(tabs)/messages',
    iconName: 'chatbot-regular',
    iconNameActive: 'chatbot-regular',
    name: 'messages',
    text: 'tab.messages',
  },
  {
    href: '/(root)/(tabs)/profil',
    iconName: 'ludo-tab',
    iconNameActive: 'ludo-tab',
    name: 'profil',
    text: 'tab.profile',
  },
];
