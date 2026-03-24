import { Stack } from 'expo-router';

import { useSafeArea } from '@/hooks/safe-area.hook';
import OnBoardingInitializer from '@/initializers/on-boarding/on-boarding-initializer';
import PushNotificationsInitializer from '@/initializers/push-notifications.initializer';

function AppLayoutNav() {
  const { bottom } = useSafeArea();

  return (
    <Stack
      initialRouteName="(tabs)"
      screenOptions={{
        animation: "slide_from_right",
        headerShown: false,
      }}
    >
      {/* ──────────── Create Session ──────────── */}
      <Stack.Screen
        name="create-session"
        options={{
          animation: 'slide_from_bottom',
          statusBarStyle: "dark",
        }}
      />
      {/* ──────────── Profil ──────────── */}
      <Stack.Screen
        name="profil/[id]/actions"
        options={{
          contentStyle: { backgroundColor: '#FFF' },
          headerShown: false,
          presentation: 'formSheet',
          sheetAllowedDetents: 'fitToContents',
          sheetCornerRadius: 12,
        }}
      />

      {/* ──────────── Profil Edit ──────────── */}
      <Stack.Screen
        name="profil/profil-edit/name"
        options={{
          contentStyle: { backgroundColor: '#FFF' },
          headerShown: false,
          presentation: 'formSheet',
          sheetAllowedDetents: 'fitToContents',
          sheetCornerRadius: 12,
        }}
      />
      <Stack.Screen
        name="profil/profil-edit/bio"
        options={{
          contentStyle: { backgroundColor: '#FFF' },
          headerShown: false,
          presentation: 'formSheet',
          sheetAllowedDetents: 'fitToContents',
          sheetCornerRadius: 12,
        }}
      />
      <Stack.Screen
        name="profil/profil-edit/birthdate"
        options={{
          contentStyle: { backgroundColor: '#FFF' },
          headerShown: false,
          presentation: 'formSheet',
          sheetAllowedDetents: 'fitToContents',
          sheetCornerRadius: 12,
        }}
      />
      <Stack.Screen
        name="profil/profil-edit/sex"
        options={{
          contentStyle: { backgroundColor: '#FFF' },
          headerShown: false,
          presentation: 'formSheet',
          sheetAllowedDetents: 'fitToContents',
          sheetCornerRadius: 12,
        }}
      />
      <Stack.Screen
        name="profil/profil-edit/email"
        options={{
          contentStyle: { backgroundColor: '#FFF' },
          headerShown: false,
          presentation: 'formSheet',
          sheetAllowedDetents: 'fitToContents',
          sheetCornerRadius: 12,
        }}
      />
      <Stack.Screen
        name="profil/profil-edit/password"
        options={{
          contentStyle: { backgroundColor: '#FFF' },
          headerShown: false,
          presentation: 'formSheet',
          sheetAllowedDetents: 'fitToContents',
          sheetCornerRadius: 12,
        }}
      />

      {/* ──────────── Filters ──────────── */}
      <Stack.Screen
        name="filters/index"
        options={{
          contentStyle: { backgroundColor: '#FFF' },
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
          contentStyle: { backgroundColor: '#FFF', paddingBottom: bottom },
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
          contentStyle: { backgroundColor: '#FFF', paddingBottom: bottom },
          headerShown: false,
          presentation: 'formSheet',
          sheetAllowedDetents: 'fitToContents',
          sheetCornerRadius: 12,
        }}
      />

      {/* ──────────── Session ──────────── */}
      <Stack.Screen
        name="session/[id]/session-teams"
        options={{
          animation: 'slide_from_bottom',
          contentStyle: { backgroundColor: '#FFF' },
          headerShown: false,
          presentation: 'formSheet',
          sheetAllowedDetents: [0.93],
          sheetCornerRadius: 12,
        }}
      />
      <Stack.Screen
        name="public-field-duration"
        options={{
          contentStyle: { backgroundColor: '#FFF' },
          headerShown: false,
          presentation: 'formSheet',
          sheetAllowedDetents: 'fitToContents',
          sheetCornerRadius: 12,
        }}
      />

      {/* ──────────── Chat Room ──────────── */}
      <Stack.Screen
        name="chat-room/[chatRoomId]/index"
        options={{
          contentStyle: { backgroundColor: '#FFF' },
          headerShown: false,
          statusBarStyle: "dark",
        }}
      />

      {/* ──────────── Notifications ──────────── */}
      <Stack.Screen
        name="notifications"
        options={{
          headerShown: false,
        }}
      />

      {/* ──────────── Invite Friends ──────────── */}
      <Stack.Screen
        name="invite-friends/[sessionId]/index"
        options={{
          animation: 'slide_from_bottom',
          contentStyle: { backgroundColor: '#FFF' },
          headerShown: false,
        }}
      />

      {/* ──────────── Image Picker ──────────── */}
      <Stack.Screen
        name="image-picker"
        options={{
          animation: 'slide_from_bottom',
          contentStyle: { backgroundColor: '#FFF' },
          headerShown: false,
          presentation: 'formSheet',
          sheetAllowedDetents: 'fitToContents',
          sheetCornerRadius: 12,
        }}
      />

      {/* ──────────── My Fields ──────────── */}
      <Stack.Screen
        name="my-fields/add"
        options={{
          contentStyle: { backgroundColor: '#FFF' },
          presentation: 'formSheet',
          sheetAllowedDetents: [0.93],
          sheetCornerRadius: 12,
        }}
      />
    </Stack>

  );
}

export default function AppLayout() {
  return (
    <>
      <PushNotificationsInitializer />
      <OnBoardingInitializer />
      <AppLayoutNav />
    </>
  );
}
