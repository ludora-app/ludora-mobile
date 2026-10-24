import { Box, BoxRow, Card, Skeleton } from '@ludo/ui';

export const SessionCardSkeleton = () => (
  <Card className="gap-2.5 p-3.5">
    <BoxRow className="h-10 items-center gap-2.5">
      <Skeleton variant="square" className="size-10 rounded-control" />
      <Box className="flex-1 gap-1.5">
        <Box className="w-36">
          <Skeleton variant="text" size="sm" />
        </Box>
        <Box className="w-20">
          <Skeleton variant="text" size="xs" />
        </Box>
      </Box>
      <Skeleton variant="rectangle" className="h-6 w-16 rounded-full" />
    </BoxRow>
    <Skeleton variant="rectangle" className="h-1.5 rounded-full" />
    <Box className="gap-1">
      <Box className="h-5 w-48 justify-center">
        <Skeleton variant="text" size="xs" />
      </Box>
      <Box className="h-5 w-40 justify-center">
        <Skeleton variant="text" size="xs" />
      </Box>
    </Box>
  </Card>
);
