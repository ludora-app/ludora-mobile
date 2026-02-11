import { Stack } from 'expo-router';

import CreateSessionHeader from '@/features/create-session/components/create-session-header/create-session-header.component';
import CreateSessionFooter from '@/features/create-session/components/create-session-footer/create-session-footer.component';

function CreateSessionLayoutNav() {
  return (
    <Stack screenOptions={{ animation: 'ios_from_right', headerShown: false }}>
      <Stack.Screen
        name="step-2/public-field-duration"
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

export default function CreateSessionLayout() {
  return (
    <>
      <CreateSessionHeader />
      <CreateSessionLayoutNav />
      <CreateSessionFooter />
    </>
  );
}
