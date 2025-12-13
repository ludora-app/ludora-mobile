import { TabTrigger } from 'expo-router/ui';

import { TAB_ROUTES } from '@/constants/TABS_ROUTES';

import TabBarButton from './tab-bar-button.component';

export default function TabBarButtonTrigger() {
  const { href, name, ...rest } = TAB_ROUTES[0];
  return (
    <TabTrigger name={name} href={href} className="flex-1" asChild>
      <TabBarButton {...rest} />
    </TabTrigger>
  );
}
