import { useMemo } from 'react';
import { GetListFixedItemSize, List } from '@ludo/ui';

import { useSafeArea } from '@/hooks/safe-area.hook';
import { IS_ANDROID } from '@/constants/platform.constants';
import { SessionCard, SessionCardSkeleton } from '@/components/ui/session-card';

import { useGetAllSessionsByFilter } from '../../queries/get-sessions-by-filter.query';
import { useGetIncommingSessionMe } from '../../queries/get-incomming-session-me.query';
import HomeSessionListHeader from './home-session-list-headers/home-session-list-header.component';
import HomeSessionListHeaderSticky from './home-session-list-headers/home-session-list-header-sticky.component';
import HomeSessionListHeaderTopList from './home-session-list-headers/home-session-list-header-top-list.component';

const FIXED_LIST_ITEM_SIZE = 170;
const FIXED_LIST_STICKY_COMPONENT_SIZE = 66.33;
const FIXED_LIST_TOP_COMPONENT_SIZE = 132.66;

const LIST_HEADER_HEIGHT = 176;
const LIST_HEADER_HEIGHT_WITH_SESSION = 210;

const BOTTOM_PADDING_EMPTY_LIST = 100;

const EMPTY_RESULT_PROPS = {
  className: 'mt-4',
  hasRandomTitle: true,
  randomOptions: 5,
  title: 'home.sessions_empty_result_v',
} as const;

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

  const fixedItemsSize = useMemo<GetListFixedItemSize>(
    () => (_item, _index, type) => {
      if (type === 'sticky') {
        return FIXED_LIST_STICKY_COMPONENT_SIZE;
      }
      if (type === 'header_top') {
        return FIXED_LIST_TOP_COMPONENT_SIZE;
      }
      return FIXED_LIST_ITEM_SIZE;
    },
    [],
  );

  const paddingBottom = useMemo(() => {
    if (IS_ANDROID) {
      if (sessions.length === 0) {
        return bottomTab + FIXED_LIST_STICKY_COMPONENT_SIZE + FIXED_LIST_TOP_COMPONENT_SIZE + BOTTOM_PADDING_EMPTY_LIST;
      }
      return bottomTab + FIXED_LIST_STICKY_COMPONENT_SIZE + FIXED_LIST_TOP_COMPONENT_SIZE;
    }
    return bottomTab;
  }, [bottomTab, sessions.length]);

  const listHeaderComponent = useMemo(
    () => <HomeSessionListHeaderTopList hasNewSession={hasNewSession} IncommingSessionMe={IncommingSessionMe} />,
    [hasNewSession, IncommingSessionMe],
  );

  const listTopComponent = useMemo(() => <HomeSessionListHeader />, []);
  const listStickyComponent = useMemo(() => <HomeSessionListHeaderSticky />, []);

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
      getFixedItemSize={fixedItemsSize}
      isRefetching={isRefetching}
      keyboardDismissMode="interactive"
      keyboardShouldPersistTaps="handled"
      SkeletonComponent={SessionCardSkeleton}
      ListHeaderComponent={listHeaderComponent}
      hasListStickyComponentTopSafeArea
      ListTopComponent={listTopComponent}
      ListStickyComponent={listStickyComponent}
      hasHeaderTransparent
      listHeaderComponentHeight={hasNewSession ? LIST_HEADER_HEIGHT_WITH_SESSION : LIST_HEADER_HEIGHT}
      contentContainerClassName="bg-background rounded-t-xl px-4"
      contentContainerStyle={{ paddingBottom }}
      emptyResultProps={EMPTY_RESULT_PROPS}
    />
  );
}
