import { List } from '@ludo/ui'
import { useMemo } from 'react'

import { useSafeArea } from '@/hooks/safe-area.hook'
import { SessionCard, SessionCardSkeleton } from '@/components/ui/session-card'

import { useGetSessionsMe } from '../../queries/get-sessions-me.query'
import SettingsFavoritesHeader from './settings-favorites-headers/settings-favorites-header.component'
import SettingsFavoritesHeaderSticky from './settings-favorites-headers/settings-favorites-header-sticky.component'

const LIST_ITEM_SIZE_HEIGHT = 170
const LIST_STICKY_COMPONENT_HEIGHT = 75
const HEADER_HEIGHT = 58

const EMPTY_RESULT_PROPS = {
  hasRandomTitle: true,
  randomOptions: 5,
  title: 'common.empty_result_title',
} as const

export default function SettingsFavoritesList() {
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

  const listHeaderComponent = useMemo(() => <SettingsFavoritesHeader />, [])
  const listStickyComponent = useMemo(() => <SettingsFavoritesHeaderSticky />, [])
  const contentContainerStyle = useMemo(() => ({ paddingBottom: bottom }), [bottom])

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
      isRefetching={isRefetching}
      refetch={refetch}
      hasRefreshControl
      contentContainerClassName="grow bg-background px-4"
      contentContainerStyle={contentContainerStyle}
      hasListStickyComponentTopSafeArea
      hasHeaderTransparent
      listHeaderComponentHeight={HEADER_HEIGHT}
      getFixedItemSize={handleFixedItemsSize}
      SkeletonComponent={SessionCardSkeleton}
      emptyResultProps={EMPTY_RESULT_PROPS}
    />
  )
}
