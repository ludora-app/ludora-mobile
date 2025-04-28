import { Stack } from 'expo-router';
import GoBackHeader from '@/components/ui/GoBackHeader';

const header = () => <GoBackHeader />;

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        animation: 'ios_from_right',
        contentStyle: { backgroundColor: '#fff' },
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" options={{ header: () => header(), headerShown: true }} />
    </Stack>
  );
}
