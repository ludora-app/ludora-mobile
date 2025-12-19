import { Stack } from 'expo-router';

import HeaderGoBack from '@/components/ui/navigation/header-go-back/components/header-go-back.component';

export default function AuthLayout() {
  const header = () => <HeaderGoBack />;
  return (
    <Stack
      screenOptions={{
        animation: 'ios_from_right',
        contentStyle: { backgroundColor: '#fff' },
        headerShown: false,
      }}
      initialRouteName="index"
    >
      <Stack.Screen name="login" options={{ headerShown: true }} />
      <Stack.Screen name="reset-password" options={{ header, headerShown: true }} />
      <Stack.Screen name="verify-code" options={{ header, headerShown: true }} />
    </Stack>
  );
}
