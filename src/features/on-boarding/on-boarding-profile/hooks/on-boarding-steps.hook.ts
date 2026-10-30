import { useState } from 'react';
import { usePathname } from 'expo-router';

import { useOnBoardingStore } from '../../stores/on-boarding.store';
import { ON_BOARDING_PLAY_AREA_STEP } from '../constants/on-boarding.constants';

export const useGetOnBoardingStep = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop()?.split('-').pop();
  const parsedStep = Number(lastSegment) || 0;
  const [fallbackStep, setFallbackStep] = useState(() => parsedStep || 1);

  if (parsedStep && parsedStep !== fallbackStep) {
    setFallbackStep(parsedStep);
  }

  return { activeStep: parsedStep || fallbackStep };
};

export const useIsOnBoardingPlayAreaMapVisible = () => {
  const { activeStep } = useGetOnBoardingStep();
  const isPlayAreaMapVisible = useOnBoardingStore(state => state.isPlayAreaMapVisible);

  return activeStep === ON_BOARDING_PLAY_AREA_STEP && isPlayAreaMapVisible;
};
