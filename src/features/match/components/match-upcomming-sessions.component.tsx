import { Box, Wrapper } from '@chillui/ui';
import SessionCard from '@/components/ui/session-card.component';

import { upcommingSessionsMock } from '../mocks/sessions.mock';

export default function MatchUpcomingSessions() {
  return (
    <Box className="">
      <Wrapper py>
        {upcommingSessionsMock.map(session => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <SessionCard key={session.id} {...session} />
        ))}
      </Wrapper>
    </Box>
  );
}
