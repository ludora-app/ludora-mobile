import { IS_ANDROID } from '@/constants/PLATFORM';
import { useSafeAreaStore } from '@/stores/safe-area.store';
import { TAB_BAR_CONSTANTS } from '@/components/ui/navigation/tab-bar/constants';

const BOTTOM_CUSTOM_SAFE_AREA = 20;
const TOP_CUSTOM_SAFE_AREA = 10;

export const useSafeArea = () => {
  const insets = useSafeAreaStore(state => state.insets);

  if (!insets) return { bottom: 0, bottomTab: 0, left: 0, right: 0, safeTop: 0, top: 0 };

  const bottomTab = TAB_BAR_CONSTANTS.BAR_HEIGHT + insets.bottom + BOTTOM_CUSTOM_SAFE_AREA;
  const bottom = IS_ANDROID ? insets.bottom + BOTTOM_CUSTOM_SAFE_AREA : insets.bottom;
  const safeTop = IS_ANDROID ? insets.top + TOP_CUSTOM_SAFE_AREA : insets.top;

  return { bottomTab, ...insets, bottom, safeTop };
};
