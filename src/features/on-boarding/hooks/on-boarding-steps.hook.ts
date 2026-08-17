import { useState } from 'react';
import { usePathname } from 'expo-router';

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
