import { useEffect } from 'react';

import { useUserMe } from '@/queries/user-me.query';
import { useOnBoardingStatusStore } from '@/stores/on-boarding-status.store';

export default function OnBoardingStatusInitializer() {
  const { userMe } = useUserMe();
  const setOnBoardingStatus = useOnBoardingStatusStore(state => state.setOnBoardingStatus);
  const { onBoardingStatus: userOnBoardingStatus } = userMe || {};


  useEffect(() => {
    if (userOnBoardingStatus) {
      setOnBoardingStatus(userOnBoardingStatus);
    }
  }, [userOnBoardingStatus, setOnBoardingStatus]);

  return null;
}