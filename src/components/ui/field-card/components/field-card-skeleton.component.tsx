import { memo } from 'react';
import { cn } from '@chillui/ui';
import { Skeleton, Box, BoxRow } from '@ludo/ui';

function FieldCardSkeleton() {
  return (
    <Box>
      <Box className="h-16 overflow-hidden rounded-t-xl">
        <Skeleton className="size-full rounded-none" />
      </Box>

      <Box className={cn('overflow-hidden rounded-b-xl border border-black/10 bg-white')}>
        <Box>
          {/* top card content */}
          <Box className="gap-2 bg-white px-3 py-2">
            <Skeleton variant="text" size="xs" />
            <BoxRow className="items-center gap-1">
              <Skeleton variant="square" className="size-5" />
              <Box className="no-wrap flex-1 flex-row items-center gap-2">
                <Skeleton variant="text" size="xs" />
                <Box>
                  <Skeleton variant="text" size="xs" />
                </Box>
              </Box>
            </BoxRow>
          </Box>
          <Box className="flex-row items-center gap-2 px-3 py-2">
            <Skeleton variant="square" size="xs" className="flex-1" />
            <Skeleton variant="square" size="xs" className="flex-1" />
            <Skeleton variant="square" size="xs" className="flex-1" />
            <Skeleton variant="square" size="xs" className="flex-1" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default memo(FieldCardSkeleton);
