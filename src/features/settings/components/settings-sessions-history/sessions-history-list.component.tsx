import { useMemo } from 'react';
import { GetListFixedItemSize, List } from '@ludo/ui';

import { useSafeArea } from '@/hooks/safe-area.hook';
import { IS_ANDROID } from '@/constants/platform.constants';
import { HEADER_OUTLINED_HEIGHT } from '@/components/ui/navigation/header-outlined/header-outlined.component';
import { SESSION_CARD_LIST_ITEM_HEIGHT, SessionCard, SessionCardSkeleton } from '@/components/ui/session-card';

import { useGetSessionsMe } from '../../queries/get-sessions-me.query';
import SessionsHistoryHeader from './sessions-history-headers/sessions-history-header.component';
import SessionsHistoryHeaderSticky from './sessions-history-headers/sessions-history-header-sticky.component';

const LIST_STICKY_COMPONENT_HEIGHT = 75;

export default function SessionsHistoryList() {
  const { bottom } = useSafeArea();

  const { fetchNextPage, hasNextPage, isError, isFetchingNextPage, isLoading, isRefetching, items, refetch } =
    useGetSessionsMe();

  const handleFixedItemsSize = useMemo<GetListFixedItemSize>(
    () => (_item, _index, type) => {
      if (type === 'sticky') {
        return LIST_STICKY_COMPONENT_HEIGHT;
      }

      return SESSION_CARD_LIST_ITEM_HEIGHT;
    },
    [],
  );

  const paddingBottom = useMemo(() => {
    if (IS_ANDROID) {
      return bottom + HEADER_OUTLINED_HEIGHT;
    }
    return bottom;
  }, [bottom]);

  const listHeaderComponent = useMemo(() => <SessionsHistoryHeader />, []);
  const listStickyComponent = useMemo(() => <SessionsHistoryHeaderSticky />, []);
  const contentContainerStyle = useMemo(() => ({ paddingBottom }), [paddingBottom]);

  return (
    <List
      data={items}
      ItemComponent={SessionCard}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      ListHeaderComponent={listHeaderComponent}
      ListStickyComponent={listStickyComponent}
      isFetchingNextPage={isFetchingNextPage}
      isLoading={isLoading}
      isError={isError}
      isRefetching={isRefetching}
      refetch={refetch}
      hasRefreshControl
      contentContainerClassName="grow bg-background px-4 rounded-t-xl"
      contentContainerStyle={contentContainerStyle}
      hasListStickyComponentTopSafeArea
      hasHeaderTransparent
      listHeaderComponentHeight={HEADER_OUTLINED_HEIGHT}
      getFixedItemSize={handleFixedItemsSize}
      SkeletonComponent={SessionCardSkeleton}
    />
  );
}
