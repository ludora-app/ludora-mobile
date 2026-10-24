import { Button } from '@ludo/ui';
import { useRouter } from 'expo-router';
import { useTranslate } from '@tolgee/react';

import ROUTES from '@/constants/routes.constants';

import { useOnBoardingStore } from '../../../../stores/on-boarding.store';

export const OnBoardingFooterButtonNext = () => {
  const { t } = useTranslate();
  const router = useRouter();
  const hasSportPreferences = useOnBoardingStore(state => state.sportPreferences.length > 0);

  const handlePress = () => {
    router.navigate(ROUTES.ON_BOARDING.STEP_2);
  };

  return (
    <Button
      title={hasSportPreferences ? t('common.button_next') : t('common.pass')}
      colorVariant={hasSportPreferences ? 'primary' : 'muted'}
      onPress={handlePress}
      size="xl"
    />
  );
};
