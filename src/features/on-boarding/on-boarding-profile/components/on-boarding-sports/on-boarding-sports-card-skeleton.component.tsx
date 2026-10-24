import { Box, Card, Skeleton } from '@ludo/ui';

export const OnBoardingSportsCardSkeleton = () => (
  <Card className="w-[47.5%] items-center gap-2 px-2 pt-4 pb-3.5">
    <Box className="w-20">
      <Skeleton variant="text" size="sm" />
    </Box>
    <Skeleton variant="circle" className="size-16" />
    <Box className="w-16">
      <Skeleton variant="text" size="sm" />
    </Box>
  </Card>
);
