import { TAB_ROUTES } from '@/constants/TABS_ROUTES';

import TabBarButton from './tab-bar-button.component';

export default function TabBarButtonTrigger() {
  const { href, name, ...rest } = TAB_ROUTES[0];
  return <TabBarButton {...rest} />;
}
