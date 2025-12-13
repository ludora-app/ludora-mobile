import { Stack } from 'expo-router';

export default function SessionFilterLayout() {
  return (
    <Stack
      screenOptions={{
        animation: 'ios_from_left',
        contentStyle: { backgroundColor: 'transparent' },
        headerShown: false,
        presentation: 'modal',
      }}
    />
  );
}
