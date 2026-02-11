import { cn } from '@chillui/ui';

import { Header, HeaderWrapper } from '@/components/ui/header';
import HeaderProgressStepper from '@/components/ui/header/components/header-progress-stepper.component';

import { useGetOnBoardingStep } from '../hooks/on-boarding-steps.hook';

export default function OnBoardingHeader() {
  const { activeStep } = useGetOnBoardingStep();

  const hasGoBack = activeStep > 1;
  return (
    <HeaderWrapper hasShadow px="none" hasTopSafeArea>
      <Header title="Completer votre profil" hasGoBack={hasGoBack} className={cn('my-2', hasGoBack && 'my-0')} />
      <HeaderProgressStepper activeStep={activeStep} numberOfSteps={3} />
    </HeaderWrapper>
  );
}
