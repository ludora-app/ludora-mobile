import { Redirect, usePathname } from 'expo-router';

import ROUTES from '@/constants/routes.constants';
import { useOnBoardingStatusStore } from '@/stores/on-boarding-status.store';

import OnBoardingStatusInitializer from './on-boarding-status.initializer';

function OnBoardingRedirect() {
  const pathname = usePathname();
  const isInsideOnBoarding = pathname.includes('on-boarding');

  if (isInsideOnBoarding) return null;

  return <Redirect href={ROUTES.ON_BOARDING.STEP_1} />;
}

export default function OnBoardingInitializer() {
  const onBoardingStatus = useOnBoardingStatusStore(state => state.onBoardingStatus);


  if (onBoardingStatus === 'COMPLETE') {
    return null;
  }

  if (onBoardingStatus === 'INCOMPLETE') {
    return <OnBoardingRedirect />;
  }

  return <OnBoardingStatusInitializer />;
}