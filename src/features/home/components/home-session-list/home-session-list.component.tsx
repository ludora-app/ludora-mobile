import { useMemo } from 'react';
import { GetListFixedItemSize, List } from '@ludo/ui';

import { useSafeArea } from '@/hooks/safe-area.hook';
import { SessionCollectionItemDto } from '@/api/generated/model';
import { SESSION_CARD_LIST_ITEM_HEIGHT } from '@/components/ui/session-card';

import { HomeHeader } from '../home-header/home-header.component';
import { useGetHomeFeatured } from '../../hooks/home-featured.hook';
import { HomeSessionListEmpty } from './home-session-list-empty.component';
import { useGetHomeSessions } from '../../queries/get-home-sessions.query';
import { HomeSessionListItem } from './home-session-list-item/home-session-list-item.component';
import { getHomeSessionBadge, HomeSessionListContext } from '../../context/home-session-list.context';
import { HomeSessionListItemSkeleton } from './home-session-list-item/home-session-list-item-skeleton.component';
import { HOME_SESSION_LIST_ITEM_BADGE_HEIGHT } from './home-session-list-item/home-session-list-item-badge.component';

/** The whole home screen: the yellow header with the featured card, then "Toutes les sessions". */
export const HomeSessionList = () => {
  const { bottomTab } = useSafeArea();
  const { joinedUids, nextMatch, recommendedUids, refetch: refetchFeatured, state, suggestion } = useGetHomeFeatured();
  const {
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isLoading,
    isRefetching,
    items: sessions,
    refetch: refetchSessions,
  } = useGetHomeSessions();

  const contextValue = useMemo(() => ({ joinedUids, recommendedUids }), [joinedUids, recommendedUids]);

  const getFixedItemSize = useMemo<GetListFixedItemSize<SessionCollectionItemDto>>(
    () => (item, _index, type) => {
      if (type === 'skeleton') return SESSION_CARD_LIST_ITEM_HEIGHT;
      if (type !== 'row') return undefined;
      const badge = getHomeSessionBadge({ joinedUids, recommendedUids, uid: item.uid });
      return SESSION_CARD_LIST_ITEM_HEIGHT + (badge ? HOME_SESSION_LIST_ITEM_BADGE_HEIGHT : 0);
    },
    [joinedUids, recommendedUids],
  );

  const listHeaderComponent = useMemo(
    () => <HomeHeader nextMatch={nextMatch} state={state} suggestion={suggestion} />,
    [nextMatch, state, suggestion],
  );

  const contentContainerStyle = useMemo(() => ({ paddingBottom: bottomTab }), [bottomTab]);

  const refetch = () => Promise.all([refetchSessions(), refetchFeatured()]);

  return (
    <HomeSessionListContext value={contextValue}>
      <List
        data={sessions}
        ItemComponent={HomeSessionListItem}
        SkeletonComponent={HomeSessionListItemSkeleton}
        EmptyComponent={HomeSessionListEmpty}
        ListHeaderComponent={listHeaderComponent}
        getFixedItemSize={getFixedItemSize}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoading}
        isError={isError}
        isRefetching={isRefetching}
        refetch={refetch}
        hasRefreshControl
        contentContainerClassName="bg-background"
        contentContainerStyle={contentContainerStyle}
      />
    </HomeSessionListContext>
  );
};
