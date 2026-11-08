import { Stack } from 'expo-router';

import COLORS from '@/constants/colors.contstants';

// Same cream background on every auth screen, also behind rounded headers / footers and during transitions
const SCREEN_OPTIONS = {
  contentStyle: { backgroundColor: COLORS.background },
  headerShown: false,
};

export default function RegisterLayout() {
  return (
    <Stack screenOptions={SCREEN_OPTIONS}>
      <Stack.Screen name="step-1" />
      <Stack.Screen name="step-2" />
    </Stack>
  );
}
