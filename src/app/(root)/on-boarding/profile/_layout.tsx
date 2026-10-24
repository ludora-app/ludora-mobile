import { BoxGrow } from '@ludo/ui';
import { Stack } from 'expo-router';

import COLORS from '@/constants/colors.contstants';
import { OnBoardingHeader } from '@/features/on-boarding/on-boarding-profile/components/on-boarding-header.component';
import { OnBoardingFooter } from '@/features/on-boarding/on-boarding-profile/components/on-boarding-footer/on-boarding-footer.component';

function OnBoardingProfileLayoutNav() {
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

export default function OnBoardingProfileLayout() {
  return (
    <BoxGrow className="bg-background">
      <OnBoardingHeader />
      <OnBoardingProfileLayoutNav />
      <OnBoardingFooter />
    </BoxGrow>
  );
}
