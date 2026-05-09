import { useEffect } from 'react';

import { useAuthStore } from '@/stores/auth.store';
import { useUserMe } from '@/queries/user-me.query';
import { useOnBoardingStatusStore } from '@/stores/on-boarding-status.store';

export default function OnBoardingStatusInitializer() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const { userMe } = useUserMe(isAuthenticated);
  const setOnBoardingStatus = useOnBoardingStatusStore(state => state.setOnBoardingStatus);
  const { onBoardingStatus: userOnBoardingStatus } = userMe || {};

  useEffect(() => {
    if (userOnBoardingStatus) {
      setOnBoardingStatus(userOnBoardingStatus);
    }
  }, [userOnBoardingStatus, setOnBoardingStatus]);

  return null;
}
