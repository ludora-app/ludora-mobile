import { Stack } from 'expo-router';

import COLORS from '@/constants/colors.contstants';

// Same cream background on every auth screen, also behind rounded headers / footers and during transitions
const SCREEN_OPTIONS = {
  contentStyle: { backgroundColor: COLORS.background },
  headerShown: false,
};

// Expo Router 58 no longer reads `initialRouteName` from the navigator props: the first route is the layout anchor
// eslint-disable-next-line camelcase
export const unstable_settings = {
  anchor: 'index',
};

export default function AuthLayout() {
  return (
    <Stack screenOptions={SCREEN_OPTIONS}>
      <Stack.Screen name="login" />
      <Stack.Screen name="send-code" />
      <Stack.Screen name="verify-code" />
      <Stack.Screen name="new-password" options={{ gestureEnabled: false, headerBackVisible: false, }} />
    </Stack>
  );
}
