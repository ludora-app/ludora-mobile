import { Stack } from 'expo-router';
import MainProvider from '@/providers/main.provider';
import { SafeAreaView } from 'react-native-safe-area-context';

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
      <SafeAreaView className="flex-1">
        <RootLayoutNav />
      </SafeAreaView>
    </MainProvider>
  );
}
