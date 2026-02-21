import { TabTrigger } from 'expo-router/ui';

import { TabRoutes } from '@/constants/TABS_ROUTES';

import TabBarItem from './tab-bar-item.component';
import TabBarItemProfil from './tab-bar-item-profil.component';
import TabBarItemMessages from './tab-bar-item-messages.component';

type TabBarTriggerProps = TabRoutes;

export default function TabBarItemTrigger(props: TabBarTriggerProps) {
  const { href, name, ...rest } = props;

  const renderItem = () => {
    switch (name) {
      case 'profil':
        return <TabBarItemProfil {...rest} />;
      case 'messages':
        return <TabBarItemMessages {...rest} />;
      default:
        return <TabBarItem {...rest} />;
    }
  };

  return (
    <TabTrigger name={name} href={href} className="flex-1" asChild>
      {renderItem()}
    </TabTrigger>
  );
}
