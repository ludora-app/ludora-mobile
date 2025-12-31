import { memo } from 'react';
import { cn } from '@chillui/ui';
import { Skeleton, Box, BoxGrow, BoxRow } from '@ludo/ui';

function SessionCardSkeleton() {
  const hasImage = true;

  return (
    <Box>
      <Box className="h-16 overflow-hidden rounded-t-xl">
        <Skeleton className="size-full rounded-none" />
      </Box>
      <Box
        className={cn('overflow-hidden rounded-xl border border-black/10 bg-white', {
          'rounded-t-none border-t-0': hasImage,
        })}
      >
        <BoxRow>
          {/* left card content */}
          <Box className="items-center justify-center gap-1 bg-[#F5F5F5] p-4">
            <Skeleton variant="square" className="size-9" />
            <Skeleton variant="text" size="xs" />
          </Box>

          {/* center card content */}
          <BoxGrow className="gap-2 bg-white px-3 py-2">
            <Skeleton variant="text" size="xs" />
            <BoxRow className="items-center gap-4">
              <BoxRow className="items-center gap-1">
                <Skeleton variant="square" className="size-4" />
                <Skeleton variant="text" size="xs" className="w-20" />
              </BoxRow>
              <BoxRow className="items-center gap-1">
                <Skeleton variant="square" className="size-4" />
                <Skeleton variant="text" size="xs" className="w-20" />
              </BoxRow>
            </BoxRow>
            <BoxRow className="gap-1">
              <Skeleton variant="square" className="size-4" />
              <Skeleton variant="text" size="xs" className="w-36" />
            </BoxRow>
          </BoxGrow>

          {/* right card content */}
          <Box className="items-center justify-center pr-4">
            <Skeleton variant="square" className="size-6" />
          </Box>
        </BoxRow>
      </Box>
    </Box>
  );
}

export default memo(SessionCardSkeleton);
