import { BoxRowCenterBetween, BoxRow, Box, Skeleton, Wrapper } from '@ludo/ui';

export default function InviteFriendsListItemSkeleton() {
  return (
    <Wrapper fill={false}>
      <BoxRowCenterBetween className="mb-3 gap-1 rounded-2xl bg-black/10 px-4 py-3">
        <BoxRow className="flex-1 items-center gap-0.5">
          <Skeleton variant="circle" size="xs" />
          <Box className="flex-1">
            <Skeleton variant="text" size="xs" />
          </Box>
        </BoxRow>
        <Skeleton variant="circle" className="size-14" />
      </BoxRowCenterBetween>
    </Wrapper>
  );
}
