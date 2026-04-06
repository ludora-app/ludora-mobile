import { useRef } from 'react';
import { usePathname } from 'expo-router';

export const useGetOnBoardingStep = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop()?.split('-').pop();
  const lastActiveStepRef = useRef(Number(lastSegment) || 1);

  const activeStep = Number(lastSegment) || lastActiveStepRef.current;
  lastActiveStepRef.current = activeStep;
  return { activeStep };
};
