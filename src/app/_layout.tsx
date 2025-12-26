import { useEffect } from 'react';
import { usePostHog } from 'posthog-react-native';

import '../styles/global.css';
import { Stack, useGlobalSearchParams, usePathname } from 'expo-router';

import { useAuthStore } from '@/stores/auth.store';
import MainProvider from '@/providers/main.provider';
import LoadingScreen from '@/features/splash/screens/splash.screen';

function RootLayoutNav() {
  const posthog = usePostHog();
  const pathname = usePathname();
  const params = useGlobalSearchParams();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  useEffect(() => {
    if (__DEV__) {
      posthog.screen(pathname, params);
    }
  }, [pathname, params, posthog]);

  return (
    <Stack
      screenOptions={{
        animation: 'ios_from_right',
        contentStyle: { backgroundColor: '#fff' },
        headerShown: false,
      }}
    >
      <Stack.Protected guard={!!isAuthenticated}>
        <Stack.Screen name="(root)" />
      </Stack.Protected>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="auth" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <MainProvider>
      <LoadingScreen />
      <RootLayoutNav />
    </MainProvider>
  );
}
