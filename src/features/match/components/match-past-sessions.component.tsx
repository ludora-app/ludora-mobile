import { Wrapper } from '@chillui/ui';
import SessionCard from '@/components/ui/session-card.component';

import { pastSessionsMock } from '../mocks/sessions.mock';

export default function MatchPastSessions() {
  return (
    <Wrapper py>
      {pastSessionsMock.map(session => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <SessionCard key={session.id} {...session} />
      ))}
    </Wrapper>
  );
}
