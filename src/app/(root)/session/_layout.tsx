import { Stack } from 'expo-router';
import sessionDetailsMock from '@/features/session/mocks/session-details.mock';
import HeaderSession, { HeaderSessionProps } from '@/components/ui/Header/Header.session';

const header = (props: HeaderSessionProps) => <HeaderSession gameMode={props.gameMode} sport={props.sport} />;

function findSession(id: string) {
  return sessionDetailsMock.find(session => session.id === Number(id));
}

type SessionRouteParams = {
  id: string;
};

export default function SessionLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: '#fff' },
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="[id]/index"
        options={({ route }) => {
          const { id } = route.params as SessionRouteParams;

          const session = findSession(id);
          return {
            header: () => header({ gameMode: session.gameMode, sport: session.sport }),
            headerShown: true,
          };
        }}
      />
    </Stack>
  );
}
