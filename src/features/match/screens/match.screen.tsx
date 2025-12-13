import { Box, TabSwitch } from '@chillui/ui';

import MatchPastSessions from '../components/match-past-sessions.component';
import MatchUpcomingSessions from '../components/match-upcomming-sessions.component';

export default function MatchScreen() {
  return (
    <Box className="flex-1">
      <TabSwitch
        cardDisplay={{
          leftScreenIcon: 'play-regular',
          rightScreenIcon: 'rectangle-history-regular',
        }}
        leftScreenTitle="Sessions à venir"
        rightScreenTitle="Sessions passées"
        leftRender={<MatchUpcomingSessions />}
        rightRender={<MatchPastSessions />}
      />
    </Box>
  );
}
