import dayjs from 'dayjs';
import { TolgeeInstance } from '@tolgee/react';

export const formatNotificationTime = (date: string, t: TolgeeInstance['t']) => {
  const dayjsData = dayjs(date);
  if (dayjsData.isToday()) {
    return dayjsData.format('HH:mm');
  }
  if (dayjsData.isYesterday()) {
    return t('common.yesterday');
  }
  return dayjsData.format('DD/MM');
};
