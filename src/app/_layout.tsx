import { Stack } from 'expo-router';
import MainProvider from '@/providers/main.provider';

import '../styles/global.css';

function RootLayoutNav() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: '#fff' },
        headerShown: false,
      }}
      initialRouteName="(root)"
    >
      <Stack.Screen name="(root)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <MainProvider>
      <RootLayoutNav />
    </MainProvider>
  );
}
