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
        name="create-session/index"
        options={{
          animation: 'slide_from_bottom',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="create-session/create-session-field-card-public-availibilities"
        options={{
          animation: 'slide_from_bottom',
          headerShown: false,
          presentation: 'formSheet',
          sheetAllowedDetents: [0.8],
          sheetCornerRadius: 12,
        }}
      />
      <Stack.Screen
        name="filters/filters-fields"
        options={{
          animation: 'slide_from_bottom',
          contentStyle: {
            backgroundColor: 'transparent',
          },
          headerShown: false,
          presentation: 'formSheet',
          sheetAllowedDetents: [0.5],
        }}
      />
      <Stack.Screen
        name="filters/filters-calendar"
        options={{
          animation: 'slide_from_bottom',
          contentStyle: {
            backgroundColor: '#FFF',
          },
          headerShown: false,
          presentation: 'formSheet',
          sheetAllowedDetents: 'fitToContents',
          sheetCornerRadius: 12,
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
