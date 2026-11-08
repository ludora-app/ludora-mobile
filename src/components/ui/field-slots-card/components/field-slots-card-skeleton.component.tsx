import { Box, BoxRow, Skeleton } from '@ludo/ui';

export const FieldSlotsCardSkeleton = () => (
  <Box className="overflow-hidden rounded-3xl bg-white">
    <Skeleton variant="rectangle" className="h-28 w-full rounded-none" />
    <Box className="gap-2.5 px-3.5 pt-3 pb-3.5">
      <Skeleton variant="text" className="h-5 w-48" />
      <Skeleton variant="text" className="h-4 w-36" />
      <BoxRow className="gap-2">
        <Skeleton variant="rectangle" className="h-13 w-19 rounded-control" />
        <Skeleton variant="rectangle" className="h-13 w-19 rounded-control" />
        <Skeleton variant="rectangle" className="h-13 w-19 rounded-control" />
      </BoxRow>
    </Box>
  </Box>
);
