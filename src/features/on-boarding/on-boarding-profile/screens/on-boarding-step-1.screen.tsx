import { useTranslate } from '@tolgee/react';
import { Box, String, WrapperScrollView } from '@ludo/ui';

import { OnBoardingSportsList } from '../components/on-boarding-sports/on-boarding-sports-list.component';

export const OnBoardingStep1Screen = () => {
  const { t } = useTranslate();

  return (
    <WrapperScrollView contentContainerClassName="gap-5 pt-6.5 pb-6">
      <Box className="gap-1.5">
        <String variant="title-1" className="text-center">
          {t('on-boarding.sports.title')}
        </String>
        <String variant="body-sm" colorVariant="muted" className="text-center">
          {t('on-boarding.sports.description')}
        </String>
      </Box>
      <OnBoardingSportsList />
    </WrapperScrollView>
  );
};
