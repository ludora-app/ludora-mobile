import * as SplashScreenNative from 'expo-splash-screen';

import { useAuthStore } from '@/stores/auth.store';

SplashScreenNative.preventAutoHideAsync();

SplashScreenNative.setOptions({
  fade: true,
});

export default function SplashScreen() {
  const isLoading = useAuthStore(state => state.isLoading);

  if (!isLoading) {
    SplashScreenNative.hideAsync();
  }

  return null;
}
