import { TabTrigger } from 'expo-router/ui';

import { TabRoutes } from '@/constants/TABS_ROUTES';

import { TabBarItem } from './tab-bar-item.component';

type TabBarTriggerProps = TabRoutes;

export default function TabBarItemTrigger(props: TabBarTriggerProps) {
  const { href, name, ...rest } = props;

  return (
    <TabTrigger name={name} href={href} className="flex-1" asChild>
      <TabBarItem {...rest} />
    </TabTrigger>
  );
}
