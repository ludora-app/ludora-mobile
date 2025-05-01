import { Stack } from 'expo-router';
import { welcomeScreenImageBackground } from 'assets';
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
      <Stack.Screen
        name="[id]/index"
        options={{ header: () => header(), headerBackground: () => welcomeScreenImageBackground, headerShown: true }}
      />
    </Stack>
  );
}
