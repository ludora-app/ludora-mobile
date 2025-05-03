import { Stack } from 'expo-router';
import GoBackHeader from '@/components/ui/go-back-header.compoent';

const header = () => <GoBackHeader />;

export default function TeamLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: '#fff' },
        headerShown: false,
      }}
    >
      <Stack.Screen name="[id]/index" options={{ header: () => header(), headerShown: true }} />
    </Stack>
  );
}
