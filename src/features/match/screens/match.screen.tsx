import { String, Wrapper } from '@/components/chillUI';

import sessionsMock from '../mocks/sessions.mock';
import SessionCard from '../../../components/ui/session-card.component';

export default function MatchScreen() {
  return (
    <Wrapper safeAreaView={false} py>
      <String variant="dark" weight="bold" size="lg">
        Sessions à venir
      </String>
      {sessionsMock.map(session => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <SessionCard key={session.id} {...session} />
      ))}
    </Wrapper>
  );
}
