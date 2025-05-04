import { Stack } from 'expo-router';
import MainProvider from '@/providers/main.provider';

import '../styles/global.css';

function RootLayoutNav() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="(root)"
    />
  );
}

export default function RootLayout() {
  return (
    <MainProvider>
      <RootLayoutNav />
    </MainProvider>
  );
}
