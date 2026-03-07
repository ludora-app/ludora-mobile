import { List } from '@ludo/ui'

import { useGetBlockedUsers } from '../../queries/get-blocked-users.query'
import SettingsBlockedUsersHeader from './settings-blocked-users-header.component'
import SettingsBlockedUsersListItem from './settings-blocked-users-list-item.component'

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
      emptyResultProps={{ title: 'settings.blocked_users.empty_list' }}
    />
  )
}
