import { memo } from 'react';
import { list } from 'radash';
import { Box } from '@ludo/ui';

import { useSafeArea } from '@/hooks/safe-area.hook';

import HomeSessionCardSkeleton from '../home-session-card-skeleton.component';

type HomeSessionCardListFooterProps = {
  isFetchingNextPage: boolean;
};

function HomeSessionCardListFooter(props: HomeSessionCardListFooterProps) {
  const { isFetchingNextPage } = props;
  const { bottomTab } = useSafeArea();

  return (
    <Box className="bg-background" style={{ paddingBottom: bottomTab }}>
      {isFetchingNextPage && list(4).map((_, index) => <HomeSessionCardSkeleton key={index} />)}
    </Box>
  );
}

export default memo(HomeSessionCardListFooter);
