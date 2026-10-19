import { bigLogo } from 'assets';
import { useTranslate } from '@tolgee/react';
import { Box, BoxGrow, Image, String } from '@ludo/ui';

import { useSafeArea } from '@/hooks/safe-area.hook';

import { WelcomeFooter } from '../components/welcome-footer.component';
import { WelcomeMatchesPreview } from '../components/welcome-matches-preview/welcome-matches-preview.component';

export const WelcomeScreen = () => {
  const { t } = useTranslate();
  const { safeTop } = useSafeArea();

  return (
    <BoxGrow className="bg-background">
      <BoxGrow className="gap-4.5 overflow-hidden px-5" style={{ paddingTop: safeTop + 16 }}>
        <Box className="pb-1.5">
          <Image source={bigLogo} contentFit="contain" className="h-16.5 w-26" />
        </Box>
        <String variant="title-3">{t('welcome.title')}</String>
        <WelcomeMatchesPreview />
      </BoxGrow>
      <WelcomeFooter />
    </BoxGrow>
  );
};
