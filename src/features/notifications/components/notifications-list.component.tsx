import { List } from '@ludo/ui'
import { useCallback, useEffect } from 'react'

import { useAnalytics } from '@/hooks/analytics-trackers.hook'
import { useNotificationsUnreadCount } from '@/queries/get-notifications_unread_count.query'

import { useGetNotificationsMe } from '../queries/get-notifications.query'
import { useMarkReadNotifications } from '../queries/mark-read-notifications.query'
import NotificationsListItems from './notifications-list-items/notifications-list-items.component'
import NotificationListHeader from './notifications-list-headers/notification-list-header.component'
import NotificationsListHeaderSticky from './notifications-list-headers/notifications-list-header-sticky.component'

const COUNT_DOWN_TO_MARK_ALL_AS_READ = 2000
const HEADER_HEIGHT = 58

export default function NotificationsList() {
  const { trackError } = useAnalytics()
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isRefetching, isSuccess, items, refetch } = useGetNotificationsMe()
  const { mutateAsync: markReadNotifications } = useMarkReadNotifications()
  const { data: unreadCount } = useNotificationsUnreadCount()


  const handleMarkAllNotificationsAsRead = useCallback(() => {
    try {
      markReadNotifications()
    } catch (error) {
      trackError({ error })
    }
  }, [markReadNotifications, trackError])

  useEffect(() => {
    const hasUnread = unreadCount && unreadCount.unreadCount > 0;

    if (!isLoading && isSuccess && hasUnread) {
      const timer = setTimeout(() => {
        handleMarkAllNotificationsAsRead();
      }, COUNT_DOWN_TO_MARK_ALL_AS_READ);

      return () => clearTimeout(timer);
    }
    return undefined
  }, [isLoading, isSuccess, unreadCount, handleMarkAllNotificationsAsRead]);


  return (
    <List
      data={items}
      ItemComponent={NotificationsListItems}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      ListHeaderComponent={<NotificationListHeader />}
      ListStickyComponent={<NotificationsListHeaderSticky />}
      isFetchingNextPage={isFetchingNextPage}
      isLoading={isLoading}
      isRefetching={isRefetching}
      refetch={refetch}
      hasRefreshControl
      contentContainerClassName="grow bg-background"
      ListStickyComponentTopSafeArea
      headerTransparent
      listHeaderComponentHeight={HEADER_HEIGHT}
      emptyResultProps={{
        hasRandomTitle: true,
        randomOptions: 3,
        title: "notifications.empty_list_v",

      }}
    />
  )
}
