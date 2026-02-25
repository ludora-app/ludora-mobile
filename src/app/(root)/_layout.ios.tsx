import { Stack } from 'expo-router';

import { useSafeArea } from '@/hooks/safe-area.hook';
import GeolocalisationInitializer from '@/initializers/geolocalisation.initializer';
import OnBoardingInitializer from '@/initializers/on-boarding/on-boarding-initializer';
import PushNotificationsInitializer from '@/initializers/push-notifications.initializer';

function AppLayoutNav() {
  const { bottom } = useSafeArea();

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
        name="invite-friends/[sessionId]/index"
        options={{
          contentStyle: {
            backgroundColor: '#FFF',
          },
          headerShown: false,
          presentation: 'modal',
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
          animation: 'slide_from_bottom',
          contentStyle: {
            backgroundColor: '#FFF',
          },
          headerShown: false,
          presentation: 'modal',
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
          presentation: 'modal',
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
      {/* Profil edit screens */}
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
      {/*------------------------*/}

      {/* Profil view screen */}
      <Stack.Screen
        name="profil/[id]/index"
        options={{
          animation: "fade_from_bottom",
          headerShown: false,
          presentation: "fullScreenModal",
        }}
      />
      {/*------------------------*/}
      <Stack.Screen
        name="chat-room/[chatRoomId]/index"
        options={{
          animation: "slide_from_bottom",
          headerShown: false,
          presentation: "fullScreenModal"
        }}
      />
      <Stack.Screen
        name="chat-room/[chatRoomId]/info/private"
        options={{
          animation: "slide_from_bottom",
          headerShown: false,
          presentation: "fullScreenModal"
        }}
      />


      {/* Session teams screen */}
      <Stack.Screen
        name="session/[id]/session-teams"
        options={{
          animation: 'slide_from_bottom',
          contentStyle: {
            backgroundColor: '#FFF',
          },
          headerShown: false,
          presentation: 'modal',
        }}
      />
      {/*------------------------*/}

      {/* My fields screens */}
      <Stack.Screen
        name="my-fields/add"
        options={{
          contentStyle: {
            backgroundColor: '#FFF',
          },
          presentation: 'modal',
          sheetCornerRadius: 12,
        }}
      />

      <Stack.Screen
        name="chat-room/[chatRoomId]/message-actions/[messageId]/index"
        options={{
          animation: 'slide_from_right',
          contentStyle: {
            backgroundColor: '#fff',
          },
          headerShown: false,
          presentation: 'formSheet',
          sheetAllowedDetents: 'fitToContents',
          sheetCornerRadius: 12,
        }}
      />
      {/*------------------------*/}

      <Stack.Screen
        name="image-picker"
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
    </Stack>
  );
}

export default function AppLayout() {
  return (
    <>
      <GeolocalisationInitializer />
      <PushNotificationsInitializer />
      <OnBoardingInitializer />
      <AppLayoutNav />
    </>
  );
}
