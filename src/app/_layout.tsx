import { Stack } from 'expo-router';
import MainProvider from '@/providers/main.provider';

import '../styles/global.css';
import { useAuthStore } from '@/stores/auth.store';
import LoadingScreen from '@/features/splash/screens/splash.screen';

function RootLayoutNav() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  return (
    <Stack
      screenOptions={{
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
