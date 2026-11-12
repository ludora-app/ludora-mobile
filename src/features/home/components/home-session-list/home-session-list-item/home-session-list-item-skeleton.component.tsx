import { Box } from '@ludo/ui';

import { SessionCardSkeleton } from '@/components/ui/session-card';

export const HomeSessionListItemSkeleton = () => (
  <Box className="px-4 pb-3">
    <SessionCardSkeleton />
  </Box>
);
