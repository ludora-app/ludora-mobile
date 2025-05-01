import { Stack } from 'expo-router';
import GoBackHeader from '@/components/ui/go-back-header.compoent';

const header = () => <GoBackHeader />;

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        animation: 'slide_from_bottom',
        contentStyle: { backgroundColor: '#fff' },
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" options={{ header: () => header(), headerShown: true }} />
    </Stack>
  );
}
