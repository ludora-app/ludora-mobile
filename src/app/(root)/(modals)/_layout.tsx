import { Stack } from 'expo-router';

export default function SessionFilterLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: 'transparent' },
        headerShown: false,
        presentation: 'transparentModal',
      }}
    />
  );
}
