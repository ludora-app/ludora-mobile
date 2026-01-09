import { BoxRowCenterBetween, BoxRow, Box, Skeleton } from '@ludo/ui';

export default function InviteFriendsListItemSkeleton() {
  return (
    <BoxRowCenterBetween className="mb-3 gap-1 rounded-2xl bg-black/10 px-4 py-3">
      <BoxRow className="flex-1 items-center gap-0.5">
        <Skeleton variant="circle" size="xs" />
        <Box className="flex-1">
          <Skeleton variant="text" size="xs" />
        </Box>
      </BoxRow>
      <Skeleton variant="circle" className="size-14" />
    </BoxRowCenterBetween>
  );
}
