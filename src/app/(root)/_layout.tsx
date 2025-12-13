import { Stack } from 'expo-router';
import UserLocationProvider from '@/providers/user-location-provider';

function AppLayoutNav() {
  return (
    <Stack
      initialRouteName="(tabs)"
      screenOptions={{
        animation: 'ios_from_right',
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="(modals)"
        options={{
          animation: 'slide_from_bottom',
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}

export default function AppLayout() {
  return (
    <UserLocationProvider>
      <AppLayoutNav />
    </UserLocationProvider>
  );
}
