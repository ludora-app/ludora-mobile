
import { List } from '@ludo/ui'
import { useMemo } from 'react'

import { useSafeArea } from '@/hooks/safe-area.hook'
import { SessionCard, SessionCardSkeleton } from '@/components/ui/session-card'

import { useGetSessionsMe } from '../../queries/get-sessions-me.query'
import SessionsHistoryHeader from './sessions-history-headers/sessions-history-header.component'
import SessionsHistoryHeaderSticky from './sessions-history-headers/sessions-history-header-sticky.component'

const LIST_ITEM_SIZE_HEIGHT = 170
const LIST_STICKY_COMPONENT_HEIGHT = 75
const HEADER_HEIGHT = 58

export default function SessionsHistoryList() {
  const { bottom } = useSafeArea()

  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isRefetching, items, refetch } =
    useGetSessionsMe()


  const handleFixedItemsSize = useMemo(
    () => (index: number) => {
      if (index === 0) {
        return LIST_STICKY_COMPONENT_HEIGHT;
      }

      return LIST_ITEM_SIZE_HEIGHT;
    },
    [],
  );

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
      contentContainerClassName="grow bg-background px-4"
      contentContainerStyle={{ paddingBottom: bottom }}
      ListStickyComponentTopSafeArea
      headerTransparent
      listHeaderComponentHeight={HEADER_HEIGHT}
      getFixedItemSize={handleFixedItemsSize}
      SkeletonComponent={SessionCardSkeleton}
    />
  )
}
