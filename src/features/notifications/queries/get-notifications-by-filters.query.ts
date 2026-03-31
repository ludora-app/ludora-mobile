import { useMemo } from 'react';

import { filterObjectEntries } from '@/utils/filters.utils';
import { NotificationsFindAllParams } from '@/api/generated/model';
import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';

import { useGetNotificationsMe } from './get-notifications.query';
import { useNotificationsFilterStore } from '../stores/notifications-filter.store';

const LIMIT_RESULTS_NOTIFICATIONS = 10;

export const useGetNotificationsMeByFilters = () => {
  const notificationsFilters = useNotificationsFilterStore(state => state.filters);
  const cleanedFilters = useMemo(() => filterObjectEntries(notificationsFilters), [notificationsFilters]);

  const params = useMemo(
    (): NotificationsFindAllParams => ({
      limit: LIMIT_RESULTS_NOTIFICATIONS,
      ...cleanedFilters as Partial<NotificationsFindAllParams>,
    }),
    [cleanedFilters],
  );

  const { data, error, isError, ...rest } = useGetNotificationsMe(params);

  useGetMethodErrorTracking({ error, extra: { context: 'useGetAllNotificationsMe', params: cleanedFilters }, isError });

  const items = useMemo(() => data?.pages.flatMap(page => page.data.items) ?? [], [data]);

  return { ...rest, items };
};
