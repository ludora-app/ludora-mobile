import { Button } from '@ludo/ui';
import { useRouter } from 'expo-router';
import { useTranslate } from '@tolgee/react';

import ROUTES from '@/constants/routes.constants';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants';

import { useOnBoardingStore } from '../../../../stores/on-boarding.store';
import { useGetOnBoardingStep } from '../../../hooks/on-boarding-steps.hook';
import { ON_BOARDING_PLAY_AREA_STEP } from '../../../constants/on-boarding.constants';

export const OnBoardingFooterButtonNext = () => {
  const { t } = useTranslate();
  const router = useRouter();
  const { trackEvent } = useAnalytics();
  const { activeStep } = useGetOnBoardingStep();

  const isPlayAreaStep = activeStep === ON_BOARDING_PLAY_AREA_STEP;
  const isStepAnswered = useOnBoardingStore(state =>
    isPlayAreaStep ? !!state.playArea : state.sportPreferences.length > 0,
  );

  const handlePress = () => {
    if (!isPlayAreaStep) {
      router.navigate(ROUTES.ON_BOARDING.STEP_2);
      return;
    }
    if (!isStepAnswered) {
      trackEvent({ eventName: ANALYTICS_EVENTS.ONBOARDING.PLAY_AREA_SKIPPED });
    }
    router.navigate(ROUTES.ON_BOARDING.STEP_3);
  };

  return (
    <Button
      title={isStepAnswered ? t('common.button_next') : t('common.pass')}
      colorVariant={isStepAnswered ? 'primary' : 'muted'}
      onPress={handlePress}
      size="xl"
    />
  );
};
