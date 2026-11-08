import { ProgressStepper } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

import { HeaderRounded } from '@/components/ui/header';

import { useGetOnBoardingStep } from '../hooks/on-boarding-steps.hook';
import { ON_BOARDING_STEPS_COUNT } from '../constants/on-boarding.constants';

export const OnBoardingHeader = () => {
  const { t } = useTranslate();
  const { activeStep } = useGetOnBoardingStep();

  return (
    <HeaderRounded title={t('on-boarding.complete_profile')} hasGoBack={activeStep > 1}>
      <ProgressStepper activeStep={activeStep} numberOfSteps={ON_BOARDING_STEPS_COUNT} />
    </HeaderRounded>
  );
};
