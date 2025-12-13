import { Stack } from 'expo-router';
import UserLocationProvider from '@/providers/user-location-provider';

export default function AppLayout() {
  return (
    <UserLocationProvider>
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
            headerShown: false,
            presentation: 'transparentModal',
          }}
        />
      </Stack>
    </UserLocationProvider>
  );
}
