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
          contentStyle: { backgroundColor: '#fff' },
          headerShown: false,
        }}
      />
    </UserLocationProvider>
  );
}
