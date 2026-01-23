import { useEffect } from 'react';
import * as SplashScreenNative from 'expo-splash-screen';

import { useAuthStore } from '@/stores/auth.store';

SplashScreenNative.preventAutoHideAsync();

SplashScreenNative.setOptions({
  fade: true,
});

export default function SplashScreen() {
  const isLoading = useAuthStore(state => state.isLoading);
  console.log('isLoading', isLoading);
  useEffect(() => {
    if (false) {
      SplashScreenNative.hideAsync();
    }
  }, [isLoading]);

  // if (!isLoading) {
  //   return null;
  // }



  return null
}
