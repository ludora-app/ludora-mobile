import { list } from 'radash';
import { Box } from '@ludo/ui';

import { useSafeArea } from '@/hooks/safe-area.hook';

import HomeSessionCardSkeleton from '../home-session-card-skeleton.component';

type HomeSessionCardListFooterProps = {
  isFetchingNextPage: boolean;
};

export default function HomeSessionCardListFooter(props: HomeSessionCardListFooterProps) {
  const { isFetchingNextPage } = props;
  const { bottomTab } = useSafeArea();
  return (
    <Box className="bg-background" style={{ paddingBottom: bottomTab }}>
      {isFetchingNextPage && list(5).map((_, index) => <HomeSessionCardSkeleton key={index} />)}
    </Box>
  );
}
