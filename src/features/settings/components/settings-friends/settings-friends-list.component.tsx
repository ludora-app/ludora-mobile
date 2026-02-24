import { List } from '@ludo/ui'

import { useGetMyFriends } from '../../queries/get-my-friends.query'
import SettingsFriendsHeader from './settings-friends-header.component'
import SettingsFriendsListItem from './settings-friends-list-item.component'

const LIST_ITEM_SIZE_HEIGHT = 95
const HEADER_HEIGHT = 62

export default function SettingsFriendsList() {
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isRefetching, items, refetch } =
    useGetMyFriends()

  return (
    <List
      data={items}
      ItemComponent={SettingsFriendsListItem}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      ListHeaderComponent={<SettingsFriendsHeader />}
      isFetchingNextPage={isFetchingNextPage}
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
      emptyResultProps={{ title: 'settings.friends.empty_list' }}
    />
  )
}
