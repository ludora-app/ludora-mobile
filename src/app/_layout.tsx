import { useEffect } from 'react';
import { usePostHog } from 'posthog-react-native';

import '../styles/global.css';
import { Stack, useGlobalSearchParams, usePathname } from 'expo-router';

import { useAuthStore } from '@/stores/auth.store';
import MainProvider from '@/providers/main.provider';
import LoadingScreen from '@/features/splash/screens/splash.screen';
import HeaderGoBack from '@/components/ui/navigation/header-go-back/components/header-go-back.component';

function StorybookHeader() {
  return <HeaderGoBack className="bg-white pb-3" />;
}

function RootLayoutNav() {
  const posthog = usePostHog();
  const pathname = usePathname();
  const params = useGlobalSearchParams();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  useEffect(() => {
    posthog.screen(pathname, params);
  }, [pathname, params, posthog]);

  return (
    <Stack
      screenOptions={{
        animation: 'ios_from_right',
        headerShown: false,
      }}
    >
      <Stack.Protected guard={!!isAuthenticated}>
        <Stack.Screen name="(root)" />
      </Stack.Protected>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="auth" />
      </Stack.Protected>
      <Stack.Screen
        name="dev-tools"
        options={{
          animation: 'slide_from_bottom',
          contentStyle: {
            backgroundColor: '#F2F4F8',
          },
          headerShown: false,
          presentation: 'formSheet',
          sheetAllowedDetents: [0.95],
        }}
      />
      <Stack.Screen
        name="storybook"
        options={{
          animation: 'slide_from_bottom',
          contentStyle: {
            backgroundColor: '#F2F4F8',
          },
          header: StorybookHeader,
          headerShown: true,
          presentation: 'modal',
        }}
      />
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
