import { Stack } from 'expo-router';
import { Wrapper } from '@/components/chillUI';
import GoBackHeader from '@/components/ui/GoBackHeader';

const header = () => <GoBackHeader />;

export default function SessionLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: '#fff' },
        headerShown: false,
      }}
    >
      <Wrapper>
        <Stack.Screen name="session" options={{ header: () => header(), headerShown: true, title: 'Session' }} />
      </Wrapper>
    </Stack>
  );
}
