import { List } from '@ludo/ui'

import { useGetNotificationsMe } from '../queries/get-notifications.query'
import NotificationsEmptyState from './notifications-empty-state.component'
import NotificationItem from './notifications-list-items/notification-list-items-friend-request.component'

export default function NotificationsList() {
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isRefetching, items } = useGetNotificationsMe()

  console.log('items==>', items)

  if (!isLoading && items.length === 0) {
    return <NotificationsEmptyState />
  }

  return (
    <List
      data={items}
      ItemComponent={NotificationItem}
      SkeletonComponent={NotificationItem}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
      isLoading={isLoading}
      isRefetching={isRefetching}
      ListEmptyComponent={<NotificationsEmptyState />}
    />
  )
}
