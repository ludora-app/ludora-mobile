import { Redirect, Stack } from 'expo-router';

const isLoggedIn = true;
export default function AppLayout() {
  if (!isLoggedIn) {
    return <Redirect href="/auth" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <Stack
      initialRouteName="(tabs)"
      screenOptions={{
        contentStyle: { backgroundColor: '#fff' },
        headerShown: false,
      }}
    />
  );
}
