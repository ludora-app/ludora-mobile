import { List } from '@ludo/ui';
import { useMemo } from 'react';

import { useSafeArea } from '@/hooks/safe-area.hook';
import { IS_ANDROID } from '@/constants/platform.constants';
import { SessionCard, SessionCardSkeleton } from '@/components/ui/session-card';
import { HEADER_OUTLINED_HEIGHT } from '@/components/ui/navigation/header-outlined/header-outlined.component';

import { useGetSessionsMe } from '../../queries/get-sessions-me.query';
import SessionsHistoryHeader from './sessions-history-headers/sessions-history-header.component';
import SessionsHistoryHeaderSticky from './sessions-history-headers/sessions-history-header-sticky.component';

const LIST_ITEM_SIZE_HEIGHT = 170;
const LIST_STICKY_COMPONENT_HEIGHT = 75;

export default function SessionsHistoryList() {
  const { bottom } = useSafeArea();

  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isRefetching, items, refetch } =
    useGetSessionsMe();

  const handleFixedItemsSize = useMemo(
    () => (index: number) => {
      if (index === 0) {
        return LIST_STICKY_COMPONENT_HEIGHT;
      }

      return LIST_ITEM_SIZE_HEIGHT;
    },
    [],
  );

  const paddingBottom = useMemo(() => {
    if (IS_ANDROID) {
      return bottom + HEADER_OUTLINED_HEIGHT;
    }
    return bottom;
  }, [bottom]);

  return (
    <List
      data={items}
      ItemComponent={SessionCard}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      ListHeaderComponent={<SessionsHistoryHeader />}
      ListStickyComponent={<SessionsHistoryHeaderSticky />}
      isFetchingNextPage={isFetchingNextPage}
      isLoading={isLoading}
      isRefetching={isRefetching}
      refetch={refetch}
      hasRefreshControl
      contentContainerClassName="grow bg-background px-4 rounded-t-xl"
      contentContainerStyle={{ paddingBottom }}
      hasListStickyComponentTopSafeArea
      hasHeaderTransparent
      listHeaderComponentHeight={HEADER_OUTLINED_HEIGHT}
      getFixedItemSize={handleFixedItemsSize}
      SkeletonComponent={SessionCardSkeleton}
    />
  );
}
