import { Stack } from 'expo-router';

import COLORS from '@/constants/colors.contstants';
import { useResetStoreOnUnmount } from '@/utils/navigation.utils';
import { useOnBoardingStore } from '@/features/on-boarding/stores/on-boarding.store';

export default function OnBoardingLayout() {
  const clearAll = useOnBoardingStore(state => state.clearAll);

  useResetStoreOnUnmount(clearAll);

  return (
    <Stack
      screenOptions={{
        animation: 'ios_from_right',
        contentStyle: { backgroundColor: COLORS.background },
        headerShown: false,
      }}
    >
      <Stack.Screen name="sessions/ready" options={{ animation: 'fade', gestureEnabled: false }} />
      <Stack.Screen name="sessions/joined" options={{ gestureEnabled: false }} />
    </Stack>
  );
}
