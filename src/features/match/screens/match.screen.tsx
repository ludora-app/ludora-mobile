import { String } from '@/components/chillUI';
import { View } from '@/components/chillUI/box/View';

import sessionsMock from '../mocks/sessions.mock';
import SessionCard from '../../../components/ui/session-card.component';

export default function MatchScreen() {
  return (
    <View className="mx-auto w-11/12">
      <String variant="dark" weight="bold" size="lg">
        Sessions à venir
      </String>
      {sessionsMock.map(session => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <SessionCard key={session.id} {...session} />
      ))}
    </View>
  );
}
