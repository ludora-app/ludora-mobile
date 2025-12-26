import { Stack } from 'expo-router';

import HeaderGoBack from '@/components/ui/navigation/header-go-back/components/header-go-back.component';

const header = () => <HeaderGoBack />;
export default function RegisterLayout() {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: '#fff' }, headerShown: false }}>
      <Stack.Screen name="step-1" options={{ header, headerShown: true }} />
      <Stack.Screen name="step-2" options={{ header, headerShown: true }} />
    </Stack>
  );
}
