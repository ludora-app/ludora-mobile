import { Stack } from 'expo-router';
import GoBackHeader from '@/components/ui/GoBackHeader';

const header = () => <GoBackHeader />;

export default function TeamLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: '#fff' },
        headerShown: false,
      }}
    >
      <Stack.Screen name="team" options={{ header: () => header(), headerShown: true, title: 'Team' }} />
    </Stack>
  );
}
