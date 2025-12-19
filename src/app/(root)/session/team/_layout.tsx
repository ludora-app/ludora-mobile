import { Stack } from 'expo-router';

export default function TeamLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="[id]/index"
        options={{
          headerShown: true,
        }}
      />
    </Stack>
  );
}
