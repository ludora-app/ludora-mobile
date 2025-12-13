import { TabList, TabSlot, TabTrigger, Tabs } from 'expo-router/ui';

import { TAB_ROUTES } from '@/constants/TABS_ROUTES';
import TabBarCustom from '@/components/ui/navigation/tab-bar/components/tab-bar.component';

export default function TabLayout() {
  return (
    <Tabs>
      <TabSlot />
      <TabBarCustom />
      <TabList className="hidden">
        {TAB_ROUTES.map((route, index) => (
          <TabTrigger key={index} name={route.name} href={route.href} />
        ))}
      </TabList>
    </Tabs>
  );
}
