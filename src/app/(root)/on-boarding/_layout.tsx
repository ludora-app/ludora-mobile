import { BoxGrow } from '@ludo/ui';
import { Stack } from 'expo-router';

import COLORS from '@/constants/colors.contstants';
import { OnBoardingHeader } from '@/features/on-boarding/components/on-boarding-header.component';
import { OnBoardingFooter } from '@/features/on-boarding/components/on-boarding-footer/on-boarding-footer.component';

function OnBoardingLayoutNav() {
  return (
    <Stack
      screenOptions={{
        animation: 'ios_from_right',
        contentStyle: { backgroundColor: COLORS.background },
        headerShown: false,
      }}
    >
      <Stack.Screen name="step-1" />
      <Stack.Screen name="step-2" />
    </Stack>
  );
}

export default function OnBoardingLayout() {
  return (
    <BoxGrow>
      <OnBoardingHeader />
      <OnBoardingLayoutNav />
      <OnBoardingFooter />
    </BoxGrow>
  );
}
