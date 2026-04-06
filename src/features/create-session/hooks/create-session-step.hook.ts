import { useRef } from 'react';
import { usePathname } from 'expo-router';

export const useGetCreateSessionStep = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop()?.split('-').pop();
  const lastActiveStepRef = useRef(Number(lastSegment) || 1);

  const activeStep = Number(pathname.split('/').pop()?.split('-').pop()) || lastActiveStepRef.current;
  lastActiveStepRef.current = activeStep;
  return { activeStep };
};
