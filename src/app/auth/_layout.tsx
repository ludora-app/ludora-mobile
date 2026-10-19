import { Stack } from 'expo-router';

import COLORS from '@/constants/colors.contstants';

// Same cream background on every auth screen, also behind rounded headers / footers and during transitions
const SCREEN_OPTIONS = {
  contentStyle: { backgroundColor: COLORS.background },
  headerShown: false,
};

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={SCREEN_OPTIONS}
      initialRouteName="index"
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="send-code" />
      <Stack.Screen name="verify-code" />
      <Stack.Screen name="new-password" options={{ gestureEnabled: false, headerBackVisible: false, }} />
    </Stack>
  );
}
