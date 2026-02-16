import React from 'react'
import { useLocalSearchParams } from 'expo-router'

import { List } from '@/components/ludo-ui'
import { useSafeArea } from '@/hooks/safe-area.hook'
import { SessionCard, SessionCardSkeleton } from '@/components/ui/session-card'
import { useGetSessionsMe } from '@/features/profil/queries/get-sessions-me.query'
import { useGetSessionsByUserId } from '@/features/profil/queries/get-sessions-by-user-id.query'

const ESTIMATED_LIST_ITEM_SIZE = 170;
export default function ProfilSection5MatchesList() {
  const { id: userId } = useLocalSearchParams()
  const { bottomTab } = useSafeArea();

  const { fetchNextPage: fetchNextPageByUserId, hasNextPage: hasNextPageByUserId, isFetchingNextPage: isFetchingNextPageByUserId, isLoading: isLoadingByUserId, isRefetching: isRefetchingByUserId, items, refetch: refetchByUserId } = useGetSessionsByUserId(userId as string)
  const { fetchNextPage: fetchNextPageMe, hasNextPage: hasNextPageMe, isFetchingNextPage: isFetchingNextPageMe, isLoading: isLoadingMe, isRefetching: isRefetchingMe, items: meItems, refetch: refetchMe } = useGetSessionsMe(!userId)


  const sessions = userId ? items : meItems
  const fetchNextPage = userId ? fetchNextPageByUserId : fetchNextPageMe
  const hasNextPage = userId ? hasNextPageByUserId : hasNextPageMe
  const isFetchingNextPage = userId ? isFetchingNextPageByUserId : isFetchingNextPageMe
  const isLoading = userId ? isLoadingByUserId : isLoadingMe
  const isRefetching = userId ? isRefetchingByUserId : isRefetchingMe


  const handleRefresh = async () => {
    if (userId) {
      await refetchByUserId()
    } else {
      await refetchMe()
    }
  }

  return (
    <List
      data={sessions}
      ItemComponent={SessionCard}
      fetchNextPage={fetchNextPage}
      refetch={handleRefresh}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      isLoading={isLoading}
      getFixedItemSize={() => ESTIMATED_LIST_ITEM_SIZE}
      isRefetching={isRefetching}
      SkeletonComponent={SessionCardSkeleton}
      bounces={false}
      contentContainerClassName="bg-background rounded-t-xl"
      contentContainerStyle={{ paddingBottom: bottomTab }}
      emptyResultProps={{
        className: 'mt-4',
        hasRandomTitle: true,
        randomOptions: 5,
        title: 'home.sessions_empty_result_v',
      }}
    />
  )
}