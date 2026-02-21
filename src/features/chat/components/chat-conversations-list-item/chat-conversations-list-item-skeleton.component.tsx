import { Box, BoxGrow, BoxRow, BoxRowCenterBetween, Skeleton } from '@ludo/ui';

export default function ChatConversationsListItemSkeleton() {
  return (
    <BoxRow className="items-center gap-2 py-2 w-full">
      <Skeleton variant="circle" size="xs" />
      <BoxGrow className="gap-2">
        <BoxRowCenterBetween className="gap-5">
          <BoxGrow>
            <Skeleton variant="text" size="sm" />
          </BoxGrow>
          <Box className="w-10">
            <Skeleton variant="text" size="sm" />
          </Box>
        </BoxRowCenterBetween>
        <BoxRowCenterBetween className="gap-5">
          <BoxGrow>
            <Skeleton variant="text" size="sm" />
          </BoxGrow>
          <Box className="w-5">
            <Skeleton variant="circle" className="size-5" />
          </Box>
        </BoxRowCenterBetween>
      </BoxGrow>
    </BoxRow>
  );
}
