import { List } from '@ludo/ui';
import { useMemo } from 'react';

import { useSafeArea } from '@/hooks/safe-area.hook';
import { SessionCard, SessionCardSkeleton } from '@/components/ui/session-card';

import { useGetAllSessionsByFilter } from '../../queries/get-sessions-by-filter.query';
import HomeSessionListHeader from './home-session-list-headers/home-session-list-header.component';
import HomeSessionListHeaderSticky from './home-session-list-headers/home-session-list-header-sticky.component';
import HomeSessionListHeaderTopList from './home-session-list-headers/home-session-list-header-top-list.component';

const ESTIMATED_LIST_ITEM_SIZE = 170;
const ESTIMATED_LIST_STICKY_COMPONENT = 66.33;
const ESTIMATED_LIST_TOP_COMPONENT = 132.66;
const LIST_HEADER_HEIGHT = 191


export default function HomeSessionList() {
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isRefetching,
    items: sessions,
    refetch,
  } = useGetAllSessionsByFilter();

  const { bottomTab } = useSafeArea();

  const fixedEstimatedItemsSize = useMemo(
    () => (index: number) => {
      if (index === 0) {
        return ESTIMATED_LIST_STICKY_COMPONENT;
      }
      if (index === 1) {
        return ESTIMATED_LIST_TOP_COMPONENT;
      }

      return ESTIMATED_LIST_ITEM_SIZE;
    },
    [],
  );

  return (
    <List
      data={sessions}
      ItemComponent={SessionCard}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      isLoading={isLoading}
      hasRefreshControl
      refetch={refetch}
      getFixedItemSize={index => fixedEstimatedItemsSize(index)}
      isRefetching={isRefetching}
      keyboardDismissMode="interactive"
      keyboardShouldPersistTaps="handled"
      SkeletonComponent={SessionCardSkeleton}
      ListHeaderComponent={<HomeSessionListHeaderTopList />}
      hasListStickyComponentTopSafeArea
      ListTopComponent={<HomeSessionListHeader />}
      ListStickyComponent={<HomeSessionListHeaderSticky />}
      hasHeaderTransparent
      listHeaderComponentHeight={LIST_HEADER_HEIGHT}
      contentContainerClassName="bg-background rounded-t-xl px-4"
      contentContainerStyle={{ paddingBottom: bottomTab }}
      emptyResultProps={{
        className: 'mt-4',
        hasRandomTitle: true,
        randomOptions: 5,
        title: 'home.sessions_empty_result_v',
      }}
    />
  );
}
