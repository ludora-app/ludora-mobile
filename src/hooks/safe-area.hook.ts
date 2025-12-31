import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IS_ANDROID } from '@/constants/PLATFORM';
import { TAB_BAR_CONSTANTS } from '@/components/ui/navigation/tab-bar/constants';

const BOTTOM_CUSTOM_SAFE_AREA = 15;

export const useSafeArea = () => {
  const insets = useSafeAreaInsets();
  const bottomTab = TAB_BAR_CONSTANTS.BAR_HEIGHT + insets.bottom + BOTTOM_CUSTOM_SAFE_AREA;
  const bottom = IS_ANDROID ? insets.bottom + BOTTOM_CUSTOM_SAFE_AREA : insets.bottom;

  return { bottomTab, ...insets, bottom };
};
