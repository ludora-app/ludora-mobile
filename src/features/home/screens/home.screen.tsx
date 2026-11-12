import { Box } from '@ludo/ui';

import { HomeSessionList } from '../components/home-session-list/home-session-list.component';

export const HomeScreen = () => (
  <Box className="flex-1 bg-background">
    <HomeSessionList />
  </Box>
);
