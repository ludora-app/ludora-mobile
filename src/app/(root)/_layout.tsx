import { Stack } from 'expo-router';

import GeolocalisationProvider from '@/providers/geolocalisation-provider';

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
    <>
      <GeolocalisationProvider />
      <AppLayoutNav />
    </>
  );
}
