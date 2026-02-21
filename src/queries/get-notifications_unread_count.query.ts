import { useNotificationsGetUnreadCount } from '@generatedApi/notifications/notifications.api';

export const useNotificationsUnreadCount = () => {
  const query = useNotificationsGetUnreadCount();

  const { data } = query?.data || {};

  return {
    ...query,
    data,
  };
};
