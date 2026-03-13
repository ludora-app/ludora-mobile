import { List } from '@ludo/ui';
import { useMemo } from 'react';

import { useSafeArea } from '@/hooks/safe-area.hook';
import { IS_ANDROID } from '@/constants/platform.constants';
import { SessionCard, SessionCardSkeleton } from '@/components/ui/session-card';

import { useGetAllSessionsByFilter } from '../../queries/get-sessions-by-filter.query';
import { useGetIncommingSessionMe } from '../../queries/get-incomming-session-me.query';
import HomeSessionListHeader from './home-session-list-headers/home-session-list-header.component';
import HomeSessionListHeaderSticky from './home-session-list-headers/home-session-list-header-sticky.component';
import HomeSessionListHeaderTopList from './home-session-list-headers/home-session-list-header-top-list.component';


const ESTIMATED_LIST_ITEM_SIZE = 170;
const ESTIMATED_LIST_STICKY_COMPONENT = 66.33;
const ESTIMATED_LIST_TOP_COMPONENT = 132.66;

const LIST_HEADER_HEIGHT = 191
const LIST_HEADER_HEIGHT_WITH_SESSION = 210;

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
  const { data: IncommingSessionMe, isLoading: IncommingSessionMeIsLoading } = useGetIncommingSessionMe();

  const showSessionCard = !!IncommingSessionMe?.uid;

  const hasNewSession = showSessionCard && !IncommingSessionMeIsLoading;

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

  const paddingBottom = useMemo(() => {
    if (IS_ANDROID) {
      return bottomTab + ESTIMATED_LIST_STICKY_COMPONENT + ESTIMATED_LIST_TOP_COMPONENT;
    }
    return bottomTab;
  }, [bottomTab]);

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
      ListHeaderComponent={
        <HomeSessionListHeaderTopList
          hasNewSession={hasNewSession}
          IncommingSessionMe={IncommingSessionMe} />
      }
      hasListStickyComponentTopSafeArea
      ListTopComponent={<HomeSessionListHeader />}
      ListStickyComponent={<HomeSessionListHeaderSticky />}
      hasHeaderTransparent
      listHeaderComponentHeight={hasNewSession ? LIST_HEADER_HEIGHT_WITH_SESSION : LIST_HEADER_HEIGHT}
      contentContainerClassName="bg-background rounded-t-xl px-4"
      contentContainerStyle={{ paddingBottom }}
      emptyResultProps={{
        className: 'mt-4',
        hasRandomTitle: true,
        randomOptions: 5,
        title: 'home.sessions_empty_result_v',
      }}
    />
  );
}
