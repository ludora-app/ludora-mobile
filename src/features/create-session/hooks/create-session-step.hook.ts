import { useState } from 'react';
import { usePathname } from 'expo-router';

export const useGetCreateSessionStep = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop()?.split('-').pop();
  const parsedStep = Number(lastSegment) || 0;
  const [fallbackStep, setFallbackStep] = useState(() => parsedStep || 1);

  // Keep the last valid step when the path briefly fails to parse (allowed render-time state adjust).
  if (parsedStep && parsedStep !== fallbackStep) {
    setFallbackStep(parsedStep);
  }

  return { activeStep: parsedStep || fallbackStep };
};
