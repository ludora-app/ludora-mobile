import { useToast } from '@chillui/ui';
import * as Clipboard from 'expo-clipboard';
import { useTranslate } from '@tolgee/react';
import { Box, BoxCenter, BoxRow, Button, Card, CardDescription, CardTitle, Icon } from '@ludo/ui';

import ROUTES from '@/constants/routes.constants';
import COLORS from '@/constants/colors.contstants';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants';

type OnBoardingSessionsJoinedInviteProps = {
  sessionUid: string;
};

export const OnBoardingSessionsJoinedInvite = (props: OnBoardingSessionsJoinedInviteProps) => {
  const { sessionUid } = props;
  const { t } = useTranslate();
  const { toast } = useToast();
  const { trackEvent } = useAnalytics();

  const handleCopy = async () => {
    await Clipboard.setStringAsync(`https://www.ludora.fr${ROUTES.SESSION.INDEX_UID(sessionUid)}`);
    toast({ message: t('on-boarding.sessions.joined.link_copied'), variant: 'success' });
    trackEvent({ data: { session_uid: sessionUid }, eventName: ANALYTICS_EVENTS.ONBOARDING.SESSIONS_LINK_COPIED });
  };

  return (
    <Card>
      <BoxRow className="items-center gap-3">
        <BoxCenter className="size-11 rounded-full bg-primarySoft">
          <Icon name="share-regular" color={COLORS.primary} size="md" />
        </BoxCenter>
        <Box className="flex-1">
          <CardTitle variant="body-1" font="primaryExtraBold">
            {t('on-boarding.sessions.joined.invite_title')}
          </CardTitle>
          <CardDescription>{t('on-boarding.sessions.joined.invite_description')}</CardDescription>
        </Box>
        <Button title={t('common.copy')} variant="outlined" colorVariant="dark" size="sm" onPress={handleCopy} fit />
      </BoxRow>
    </Card>
  );
};
