import React, { ReactElement } from 'react'
import { useLocalSearchParams } from 'expo-router'

import { List } from '@/components/ludo-ui'
import { cn } from '@/components/chill-ui-library'
import { useSafeArea } from '@/hooks/safe-area.hook'
import { useProfilStore } from '@/features/profil/stores/profil.store'
import { useGetSessionsMe } from '@/features/profil/queries/get-sessions-me.query'
import { useGetSessionsByUserId } from '@/features/profil/queries/get-sessions-by-user-id.query'

import ProfilSection5ListItem from './profil-section-5-list-item.component'
import profilSection5ListItemSkeletonComponent from './profil-section-5-list-item-skeleton.component'

const ESTIMATED_LIST_ITEM_SIZE = 170;
const LIST_HEADER_HEIGHT = 120;

type Props = {
  listHeaderComponent?: ReactElement;
  isRefetching?: boolean;
  onRefresh?: () => Promise<void>;
}

export default function ProfilSection5MatchesList({ isRefetching: isRefetchingProfile, listHeaderComponent, onRefresh }: Props) {
  const { id: userId } = useLocalSearchParams()
  const { bottomTab } = useSafeArea();
  const selectedTab = useProfilStore(state => state.selectedTab)

  const { fetchNextPage: fetchNextPageByUserId, hasNextPage: hasNextPageByUserId, isFetchingNextPage: isFetchingNextPageByUserId, isLoading: isLoadingByUserId, isRefetching: isRefetchingByUserId, items, refetch: refetchByUserId } = useGetSessionsByUserId(userId as string)
  const { fetchNextPage: fetchNextPageMe, hasNextPage: hasNextPageMe, isFetchingNextPage: isFetchingNextPageMe, isLoading: isLoadingMe, isRefetching: isRefetchingMe, items: meItems, refetch: refetchMe } = useGetSessionsMe(!userId)

  const sessions = userId ? items : meItems
  const fetchNextPage = userId ? fetchNextPageByUserId : fetchNextPageMe
  const hasNextPage = userId ? hasNextPageByUserId : hasNextPageMe
  const isFetchingNextPage = userId ? isFetchingNextPageByUserId : isFetchingNextPageMe
  const isLoading = userId ? isLoadingByUserId : isLoadingMe
  const isRefetching = (userId ? isRefetchingByUserId : isRefetchingMe) || !!isRefetchingProfile

  const handleRefresh = async () => {
    await Promise.all([
      userId ? refetchByUserId() : refetchMe(),
      onRefresh?.(),
    ])
  }

  return (
    <List
      data={sessions}
      ItemComponent={ProfilSection5ListItem}
      fetchNextPage={fetchNextPage}
      refetch={handleRefresh}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      isLoading={isLoading}
      getFixedItemSize={() => ESTIMATED_LIST_ITEM_SIZE}
      isRefetching={isRefetching}
      SkeletonComponent={profilSection5ListItemSkeletonComponent}
      hasRefreshControl
      bounces={false}
      listHeaderComponentHeight={LIST_HEADER_HEIGHT}
      hasHeaderTransparent
      ListHeaderComponent={listHeaderComponent}
      contentContainerClassName={cn("bg-background", { "rounded-t-xl": selectedTab === "matches" })}
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
