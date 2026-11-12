import { useState, useCallback } from 'react';

import dayjs from '@/lib/dayjs';
import useAppStateChange from '@/hooks/app-state.hook';

import { HOME_DATE_REFRESH_MINUTES } from '../constants/home.constants';

/**
 * "Now" for the home screen. The home tab is never unmounted, so a date fixed at mount would stay the one of the
 * cold start: it is taken again when the app comes back to the foreground after a while.
 */
export const useHomeDate = () => {
  const [date, setDate] = useState(() => new Date());

  const handleActive = useCallback(() => {
    setDate(current => (dayjs().diff(current, 'minute') >= HOME_DATE_REFRESH_MINUTES ? new Date() : current));
  }, []);

  useAppStateChange(handleActive);

  return date;
};
