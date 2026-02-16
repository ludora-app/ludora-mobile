import { Redirect, Stack, usePathname } from 'expo-router';

import { useSafeArea } from '@/hooks/safe-area.hook';
import GeolocalisationProvider from '@/providers/geolocalisation-provider';

function AppLayoutNav() {
  const { bottom } = useSafeArea();
  const pathname = usePathname();
  const profileStatus = '';
  const showPreferences = profileStatus === 'PENDING';
  const isInsideOnBoarding = pathname.includes('on-boarding') || pathname.includes('image-picker');

  if (showPreferences && !isInsideOnBoarding) {
    return <Redirect href="/on-boarding/step-1" />;
  }

  return (
    <Stack
      initialRouteName="(tabs)"
      screenOptions={{
        animation: 'ios_from_right',
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="create-session"
        options={{
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        name="profil/profil-edit/name"
        options={{
          contentStyle: {
            backgroundColor: '#FFF',
          },
          headerShown: false,
          presentation: 'formSheet',
          sheetAllowedDetents: 'fitToContents',
          sheetCornerRadius: 12,
        }}
      />
      <Stack.Screen
        name="profil/profil-edit/bio"
        options={{
          contentStyle: {
            backgroundColor: '#FFF',
          },
          headerShown: false,
          presentation: 'formSheet',
          sheetAllowedDetents: 'fitToContents',
          sheetCornerRadius: 12,
        }}
      />
      <Stack.Screen
        name="profil/profil-edit/birthdate"
        options={{
          contentStyle: {
            backgroundColor: '#FFF',
          },
          headerShown: false,
          presentation: 'formSheet',
          sheetAllowedDetents: 'fitToContents',
          sheetCornerRadius: 12,
        }}
      />
      <Stack.Screen
        name="profil/profil-edit/sex"
        options={{
          contentStyle: {
            backgroundColor: '#FFF',
          },
          headerShown: false,
          presentation: 'formSheet',
          sheetAllowedDetents: 'fitToContents',
          sheetCornerRadius: 12,
        }}
      />
      <Stack.Screen
        name="profil/profil-edit/email"
        options={{
          contentStyle: {
            backgroundColor: '#FFF',
          },
          headerShown: false,
          presentation: 'formSheet',
          sheetAllowedDetents: 'fitToContents',
          sheetCornerRadius: 12,
        }}
      />
      <Stack.Screen
        name="profil/profil-edit/password"
        options={{
          contentStyle: {
            backgroundColor: '#FFF',
          },
          headerShown: false,
          presentation: 'formSheet',
          sheetAllowedDetents: 'fitToContents',
          sheetCornerRadius: 12,
        }}
      />
      <Stack.Screen
        name="invite-people"
        options={{
          animation: 'slide_from_bottom',
          contentStyle: {
            backgroundColor: '#FFF',
          },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="notifications"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="filters/index"
        options={{
          contentStyle: {
            backgroundColor: '#FFF',
          },
          headerShown: false,
          presentation: 'formSheet',
          sheetAllowedDetents: [0.93],
          sheetCornerRadius: 12,
        }}
      />
      <Stack.Screen
        name="filters/filters-addresses"
        options={{
          animation: 'slide_from_bottom',
          contentStyle: {
            backgroundColor: '#FFF',
            paddingBottom: bottom,
          },
          headerShown: false,
          presentation: 'formSheet',
          sheetAllowedDetents: [0.93],
          sheetCornerRadius: 12,
        }}
      />
      <Stack.Screen
        name="filters/filters-calendar"
        options={{
          animation: 'slide_from_bottom',
          contentStyle: {
            backgroundColor: '#FFF',
            paddingBottom: bottom,
          },
          headerShown: false,
          presentation: 'formSheet',
          sheetAllowedDetents: 'fitToContents',
          sheetCornerRadius: 12,
        }}
      />
      <Stack.Screen
        name="session/[id]/session-teams"
        options={{
          animation: 'slide_from_bottom',
          contentStyle: {
            backgroundColor: '#FFF',
          },
          headerShown: false,
          presentation: 'formSheet',
          sheetAllowedDetents: [0.93],
          sheetCornerRadius: 12,
        }}
      />
      <Stack.Screen
        name="image-picker"
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
