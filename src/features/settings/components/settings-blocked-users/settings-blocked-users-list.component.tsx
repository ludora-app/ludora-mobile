import { List } from '@ludo/ui'

import { useGetBlockedUsers } from '../../queries/get-blocked-users.query'
import SettingsBlockedUsersHeader from './settings-blocked-users-header.component'
import SettingsBlockedUsersListItem from './settings-blocked-users-list-item/settings-blocked-users-list-item.component'
import SettingsBlockedUsersListItemSkeleton from './settings-blocked-users-list-item/settings-blocked-users-list-item-skeleton.component'

const LIST_ITEM_SIZE_HEIGHT = 95
const HEADER_HEIGHT = 62

export default function SettingsBlockedUsersList() {
  const { isLoading, isRefetching, items, refetch } = useGetBlockedUsers()

  return (
    <List
      data={items}
      fetchNextPage={() => { }}
      isFetchingNextPage={false}
      hasNextPage={false}
      ItemComponent={SettingsBlockedUsersListItem}
      SkeletonComponent={SettingsBlockedUsersListItemSkeleton}
      ListHeaderComponent={<SettingsBlockedUsersHeader />}
      isLoading={isLoading}
      isRefetching={isRefetching}
      refetch={refetch}
      hasRefreshControl
      contentContainerClassName="grow bg-background px-4 rounded-t-xl"
      hasBottomSafeArea
      hasHeaderTransparent
      hasTopSafeArea
      listHeaderComponentHeight={HEADER_HEIGHT}
      getFixedItemSize={() => LIST_ITEM_SIZE_HEIGHT}
      emptyResultProps={{
        hasRandomTitle: true,
        iconNames: ["ludo-eating-pizza"],
        randomOptions: 3,
        title: 'settings.blocked_users.empty_list_v'
      }}
    />
  )
}
