import { Stack } from 'expo-router';
import GoBackHeader from '@/components/ui/GoBackHeader';

const header = () => <GoBackHeader />;

export default function SessionLayout() {
  return (
    <Stack>
      <Stack.Screen name="session" options={{ header: () => header(), headerShown: true, title: 'Session' }} />
    </Stack>
  );
}
