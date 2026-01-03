import { memo } from 'react';
import { Box, Skeleton } from '@ludo/ui';

function FilterAddressesResultItemSkeleton() {
  return (
    <Box className="flex-row items-center gap-3">
      <Skeleton variant="circle" size="xs" />
      <Skeleton variant="text" size="sm" />
    </Box>
  );
}

export default memo(FilterAddressesResultItemSkeleton);
