
import { List } from '@ludo/ui'

import { useSafeArea } from '@/hooks/safe-area.hook'
import { SessionCard, SessionCardSkeleton } from '@/components/ui/session-card'

import { useGetSessionsMe } from '../../queries/get-sessions-me.query'

const ESTIMATED_LIST_ITEM_SIZE = 170

export default function SessionsHistoryList() {
  const { bottom } = useSafeArea()

  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isRefetching, items } =
    useGetSessionsMe()

  // TODO : FIX EMPTY WHEN SCOPE CHANGES
  return (
    <List
      bounces={false}
      contentContainerClassName="bg-background rounded-t-xl"
      contentContainerStyle={{ paddingBottom: bottom }}
      data={items}
      estimatedItemSize={ESTIMATED_LIST_ITEM_SIZE}
      fetchNextPage={fetchNextPage}
      getFixedItemSize={() => ESTIMATED_LIST_ITEM_SIZE}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      isLoading={isLoading}
      isRefetching={isRefetching}
      ItemComponent={SessionCard}
      recycleItems={false}
      SkeletonComponent={SessionCardSkeleton}
    />

  )
}
