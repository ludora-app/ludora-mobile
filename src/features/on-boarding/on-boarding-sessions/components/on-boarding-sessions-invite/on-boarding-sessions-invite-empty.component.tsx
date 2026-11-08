import { BoxCenter, String } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

import { MascotHalo } from '@/components/ui/mascot-halo';

export const OnBoardingSessionsInviteEmpty = () => {
  const { t } = useTranslate();

  return (
    <BoxCenter className="gap-3 px-2 py-4">
      <MascotHalo name="ludo-search" size="md" />
      <String variant="title-1" className="text-center leading-8">
        {t('on-boarding.sessions.invite.empty_title')}
      </String>
      <String variant="body-sm" font="primarySemiBold" colorVariant="muted" className="text-center">
        {t('on-boarding.sessions.invite.empty_description')}
      </String>
    </BoxCenter>
  );
};
