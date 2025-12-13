import { Text } from 'react-native';
import { BottomSheet, Button } from '@chillui/ui';

export default function CreateSessionScreen() {
  return (
    <BottomSheet screen title="Créer une session" footer={<Button title="FINALISER LA CREATION" />}>
      <Text>create-session.screen</Text>
    </BottomSheet>
  );
}
