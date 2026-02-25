import { useSafeAreaStore } from '@/stores/safe-area.store';

import SafeAreaInsetsInitializer from './safe-area-insets.initializer';

export default function SafeAreaInitializer() {
  const insets = useSafeAreaStore(state => state.insets);

  return (
    !insets && <SafeAreaInsetsInitializer />
  )
}