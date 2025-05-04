import { Redirect, Stack } from 'expo-router';
import UserLocationProvider from '@/providers/user-location-provider';

const isLoggedIn = true;
export default function AppLayout() {
  if (!isLoggedIn) {
    return <Redirect href="/auth" />;
  }

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
          name="session-filter"
          options={{
            animation: 'slide_from_bottom',
            presentation: 'transparentModal',
          }}
        />
      </Stack>
    </UserLocationProvider>
  );
}
