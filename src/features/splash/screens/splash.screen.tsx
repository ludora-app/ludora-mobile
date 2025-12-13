import { useAuthStore } from '@/stores/auth.store';
import * as SplashScreenNative from 'expo-splash-screen';
import { useShallow } from 'zustand/shallow';

SplashScreenNative.preventAutoHideAsync();

SplashScreenNative.setOptions({
  fade: true,
});

export default function SplashScreen() {
  const isLoading = useAuthStore(useShallow(state => state.isLoading));

  if (!isLoading) {
    SplashScreenNative.hideAsync();
  }

  return null;
}
