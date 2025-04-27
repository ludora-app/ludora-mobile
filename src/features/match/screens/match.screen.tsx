import { View } from '@/components/chillUI/box/View';
import { sessionsMock } from '../mocks/sessions.mock';
import SessionCard from '../components/session-card.component';
import { String } from '@/components/chillUI';

export default function MatchScreen() {
  return (
    <View className="mx-auto w-11/12">
      <String variant="dark" weight="bold" size="lg">
        Sessions à venir
      </String>
      {sessionsMock.map(session => (
        <SessionCard key={session.id} {...session} />
      ))}
    </View>
  );
}
