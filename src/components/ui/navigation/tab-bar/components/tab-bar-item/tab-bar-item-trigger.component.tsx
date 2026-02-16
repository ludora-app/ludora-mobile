import { TabTrigger } from 'expo-router/ui';

import { TabRoutes } from '@/constants/TABS_ROUTES';

import TabBarItem from './tab-bar-item.component';
import TabBarItemProfil from './tab-bar-item-profil.component';

type TabBarTriggerProps = TabRoutes;

export default function TabBarItemTrigger(props: TabBarTriggerProps) {
  const { href, name, ...rest } = props;

  return (
    <TabTrigger name={name} href={href} className="flex-1" asChild>
      {name === 'profil' ? <TabBarItemProfil {...rest} /> : <TabBarItem {...rest} />}
    </TabTrigger>
  );
}
