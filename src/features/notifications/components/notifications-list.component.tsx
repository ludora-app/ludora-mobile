import { List } from '@ludo/ui';
import { useCallback, useEffect, useMemo } from 'react';

import { useSafeArea } from '@/hooks/safe-area.hook';
import { IS_ANDROID } from '@/constants/platform.constants';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { useNotificationsUnreadCount } from '@/queries/get-notifications_unread_count.query';
import { HEADER_OUTLINED_HEIGHT } from '@/components/ui/navigation/header-outlined/header-outlined.component';

import { useMarkReadNotifications } from '../queries/mark-read-notifications.query';
import { useGetNotificationsMeByFilters } from '../queries/get-notifications-by-filters.query';
import NotificationsListItems from './notifications-list-items/notifications-list-items.component';
import NotificationListHeader from './notifications-list-headers/notification-list-header.component';
import NotificationsListHeaderSticky from './notifications-list-headers/notifications-list-header-sticky.component';

const COUNT_DOWN_TO_MARK_ALL_AS_READ = 1000;

const EMPTY_RESULT_PROPS = {
  hasRandomTitle: true,
  randomOptions: 3,
  title: 'notifications.empty_list_v',
} as const;

export default function NotificationsList() {
  const { bottom } = useSafeArea();
  const { trackError } = useAnalytics();
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isRefetching, isSuccess, items, refetch } =
    useGetNotificationsMeByFilters();
  const { mutateAsync: markReadNotifications } = useMarkReadNotifications();
  const { data: unreadCount } = useNotificationsUnreadCount();

  const handleMarkAllNotificationsAsRead = useCallback(() => {
    try {
      markReadNotifications();
    } catch (error) {
      trackError({ error });
    }
  }, [markReadNotifications, trackError]);

  useEffect(() => {
    const hasUnread = unreadCount && unreadCount.unreadCount > 0;

    if (!isLoading && isSuccess && hasUnread) {
      const timer = setTimeout(() => {
        handleMarkAllNotificationsAsRead();
      }, COUNT_DOWN_TO_MARK_ALL_AS_READ);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isLoading, isSuccess, unreadCount, handleMarkAllNotificationsAsRead]);

  const paddingBottom = useMemo(() => {
    if (IS_ANDROID) {
      return bottom + HEADER_OUTLINED_HEIGHT;
    }
    return bottom;
  }, [bottom]);

  const listHeaderComponent = useMemo(() => <NotificationListHeader />, []);
  const listStickyComponent = useMemo(() => <NotificationsListHeaderSticky />, []);
  const contentContainerStyle = useMemo(() => ({ paddingBottom }), [paddingBottom]);

  return (
    <List
      data={items}
      ItemComponent={NotificationsListItems}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      ListHeaderComponent={listHeaderComponent}
      ListStickyComponent={listStickyComponent}
      isFetchingNextPage={isFetchingNextPage}
      isLoading={isLoading}
      isRefetching={isRefetching}
      refetch={refetch}
      hasRefreshControl
      hasListStickyComponentTopSafeArea
      contentContainerClassName="bg-background px-3 rounded-t-xl"
      hasHeaderTransparent
      listHeaderComponentHeight={HEADER_OUTLINED_HEIGHT}
      contentContainerStyle={contentContainerStyle}
      emptyResultProps={EMPTY_RESULT_PROPS}
    />
  );
}
