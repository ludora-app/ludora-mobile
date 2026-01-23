import { Box, BoxGrow, Button, Icon, String, Wrapper } from '@ludo/ui';

import HeaderGoBack from '@/components/ui/navigation/header-go-back/components/header-go-back.component';
import { useTranslate } from '@tolgee/react';

export default function SessionJoinedScreen() {
  const { t } = useTranslate();
  return (
    <>
      <HeaderGoBack className="absolute top-0 right-0 left-0" />
      <Wrapper fill className="items-center justify-center gap-8">
        <Box className="items-center gap-4">
          <Icon name="ludo-fight" className="size-36" />
          <String variant="title-1" font="primaryBold">
            {t('session.session-joined.title')}
          </String>
          <String className="text-center">{t('session.session-joined.description')}</String>
        </Box>
        <Box className="w-full gap-4">
          <Button title={t('session.session-joined.exchange_with_players')} />
          <Button title={t('session.session-joined.back_to_home')} variant="outlined" className="bg-white" />
        </Box>
      </Wrapper>
    </>
  );
}
