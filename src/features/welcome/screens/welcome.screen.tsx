import { bigLogo } from 'assets';
import { useTranslate } from '@tolgee/react';
import { Box, Image, String, Wrapper } from '@ludo/ui';

import { WelcomeFooter } from '../components/welcome-footer.component';
import { WelcomeMatchesPreview } from '../components/welcome-matches-preview/welcome-matches-preview.component';

export const WelcomeScreen = () => {
  const { t } = useTranslate();

  return (
    <>
      <Wrapper grow className="gap-4.5 overflow-hidden" safeArea={['top']}>
        <Box className="pb-1.5">
          <Image source={bigLogo} contentFit="contain" className="h-16.5 w-26" />
        </Box>
        <String variant="title-3">{t('welcome.title')}</String>
        <WelcomeMatchesPreview />
      </Wrapper>
      <WelcomeFooter />
    </>
  );
};
