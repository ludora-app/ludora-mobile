import { Stack } from 'expo-router';

import OnBoardingFooter from '@/features/on-boarding/components/on-boarding-footer/on-boarding-footer.component';
import OnBoardingHeader from '@/features/on-boarding/components/on-boarding-header.component';

function OnBoardingLayoutNav() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="step-1" />
      <Stack.Screen name="step-2" />
      <Stack.Screen name="step-3" />
    </Stack>
  );
}

export default function OnBoardingLayout() {
  return (
    <>
      <OnBoardingHeader />
      <OnBoardingLayoutNav />
      <OnBoardingFooter />
    </>
  );
}
