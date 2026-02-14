import { List } from '@/components/ludo-ui'
import { useSafeArea } from '@/hooks/safe-area.hook'
import { FieldCard, FieldCardSkeleton } from '@/components/ui/field-card'
import { useGetFields } from '@/features/create-session/queries/get-fields.query'

const ESTIMATED_LIST_ITEM_SIZE = 170

function FieldItem({ item }: { item: any }) {
  return <FieldCard field={item} />
}

export default function SettingsFavoritesFieldsList() {
  const { bottom } = useSafeArea()

  // NOTE: For now using useGetFields as placeholder. 
  // Should be replaced with a favorite-specific query when available.
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isRefetching } =
    useGetFields({})

  const items = data?.pages.flatMap(page => page.data.items) ?? [];

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
      ItemComponent={FieldItem}
      recycleItems={false}
      SkeletonComponent={FieldCardSkeleton}
      emptyResultProps={{
        title: 'settings.favorites.fields_empty_result',
      }}
    />
  )
}
