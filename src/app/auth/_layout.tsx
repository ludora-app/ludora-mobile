import { Stack } from 'expo-router';

import HeaderGoBack from '@/components/ui/navigation/header-go-back/components/header-go-back.component';

const header = () => <HeaderGoBack />;

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: '#fff' },
        headerShown: false,
      }}
      initialRouteName="index"
    >
      <Stack.Screen name="login" options={{ header, headerShown: true }} />
      <Stack.Screen name="reset-password" options={{ header, headerShown: true }} />
      <Stack.Screen name="verify-code" options={{ header, headerShown: true }} />
      <Stack.Screen name="new-password" options={{ gestureEnabled: false }} />
    </Stack>
  );
}
