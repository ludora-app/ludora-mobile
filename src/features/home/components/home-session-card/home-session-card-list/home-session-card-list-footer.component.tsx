import { memo } from 'react';
import { list } from 'radash';
import { Box } from '@ludo/ui';

import HomeSessionCardSkeleton from '../home-session-card-skeleton.component';

type HomeSessionCardListFooterProps = {
  isFetchingNextPage: boolean;
};

const SKELETON_COUNT = 3;

function HomeSessionCardListFooter(props: HomeSessionCardListFooterProps) {
  const { isFetchingNextPage } = props;

  return (
    <Box className="bg-background">
      {isFetchingNextPage && list(SKELETON_COUNT).map((_, index) => <HomeSessionCardSkeleton key={index} />)}
    </Box>
  );
}

export default memo(HomeSessionCardListFooter);
