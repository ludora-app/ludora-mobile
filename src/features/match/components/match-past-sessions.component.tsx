import { Box, Wrapper } from '@/components/chillUI';
import SessionCard from '@/components/ui/session-card.component';

import { pastSessionsMock } from '../mocks/sessions.mock';

export default function MatchPastSessions() {
  return (
    <Box className="">
      <Wrapper safeAreaView={false} py>
        {pastSessionsMock.map(session => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <SessionCard key={session.id} {...session} />
        ))}
      </Wrapper>
    </Box>
  );
}
