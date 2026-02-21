import { useEffect } from 'react';
import { Uniwind } from 'uniwind';
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useSafeAreaStore } from '@/stores/safe-area.store';

export default function SafeAreaProvider() {
  const nativeInsets = useSafeAreaInsets();
  const setInsets = useSafeAreaStore(state => state.setInsets);



  useEffect(() => {
    if (nativeInsets)
      Uniwind.updateInsets(nativeInsets)
    setInsets(nativeInsets);
  }, [nativeInsets, setInsets]);
  return null
}