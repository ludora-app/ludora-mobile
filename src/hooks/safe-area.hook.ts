import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TAB_BAR_CONSTANTS } from '@/components/ui/navigation/tab-bar/constants';

const BOTTOM_CUSTOM_SAFE_AREA = 15;

export const useSafeArea = () => {
  const insets = useSafeAreaInsets();
  const bottomTab = TAB_BAR_CONSTANTS.BAR_HEIGHT + insets.bottom + BOTTOM_CUSTOM_SAFE_AREA;

  return { bottomTab, ...insets };
};
