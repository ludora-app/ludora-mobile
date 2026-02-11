import { useMemo } from 'react';
import { Button } from '@ludo/ui'
import { useRouter } from 'expo-router';
import { useTranslate } from '@tolgee/react'

import { useOnBoardingStore } from '../../../stores/on-boarding.store';
import { useGetOnBoardingStep } from '../../../hooks/on-boarding-steps.hook';

export default function OnBoardingFooterButtonNext() {
  const { activeStep } = useGetOnBoardingStep();
  const profilePicture = useOnBoardingStore(state => state.profilePicture);
  const sportPreferences = useOnBoardingStore(state => state.sportPreferences);
  const { t } = useTranslate();
  const router = useRouter();

  const handleSubmit = () => {
    router.push(`/on-boarding/step-${activeStep + 1}`);
  };

  const buttonTitle = useMemo(() => {
    if (activeStep === 1 && !profilePicture) {
      return t('common.pass');
    }
    if (activeStep === 2 && sportPreferences.length === 0) {
      return t('common.pass');
    }
    return t('common.button_next');
  }, [activeStep, profilePicture, sportPreferences, t]);

  const buttonColorVariant = useMemo(() => {
    if (activeStep === 1 && !profilePicture) {
      return 'muted';
    }
    if (activeStep === 2 && sportPreferences.length === 0) {
      return 'muted';
    }
    return 'primary';
  }, [activeStep, profilePicture, sportPreferences]);

  return (
    <Button title={buttonTitle} onPress={handleSubmit} colorVariant={buttonColorVariant} />
  )
}