import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        animation: 'ios_from_right',
        contentStyle: { backgroundColor: '#fff' },
        headerShown: false,
      }}
    />
  );
}
