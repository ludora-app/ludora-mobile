import { useRef } from 'react';
import { usePathname } from 'expo-router';

export const useGetCreateSessionStep = () => {
  const pathname = usePathname();
  const lastActiveStepRef = useRef(Number(pathname.split('/').pop().split('-').pop()) || 1);

  const activeStep = Number(pathname.split('/').pop().split('-').pop()) || lastActiveStepRef.current;
  lastActiveStepRef.current = activeStep;
  return { activeStep };
};
