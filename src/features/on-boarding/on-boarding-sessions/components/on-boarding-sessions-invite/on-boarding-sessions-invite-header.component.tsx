import { useToast } from '@chillui/ui';
import * as Clipboard from 'expo-clipboard';
import { useTranslate } from '@tolgee/react';
import { Box, BoxRow, Icon, String } from '@ludo/ui';

import ROUTES from '@/constants/routes.constants';
import COLORS from '@/constants/colors.contstants';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { LUDORA_WEBSITE_URL } from '@/constants/links.constants';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants';

import { useOnBoardingSessionsStore } from '../../../stores/on-boarding-sessions.store';
import { OnBoardingSessionsInviteLink } from './on-boarding-sessions-invite-link.component';
import { InviteLinkShareChannel } from './on-boarding-sessions-invite-link-share.component';

type OnBoardingSessionsInviteHeaderProps = {
  hasPlayers: boolean;
  sessionDate: string;
  sportLabel: string;
};

export const OnBoardingSessionsInviteHeader = (props: OnBoardingSessionsInviteHeaderProps) => {
  const { hasPlayers, sessionDate, sportLabel } = props;
  const { t } = useTranslate();
  const { toast } = useToast();
  const { trackEvent } = useAnalytics();
  const publishedSessionUid = useOnBoardingSessionsStore(state => state.publishedSessionUid);

  const sessionUrl = `${LUDORA_WEBSITE_URL}${ROUTES.SESSION.INDEX_UID(publishedSessionUid ?? '')}`;

  const handleCopyLink = async () => {
    if (!publishedSessionUid) return;
    await Clipboard.setStringAsync(sessionUrl);
    toast({ message: t('on-boarding.sessions.joined.link_copied'), variant: 'success' });
    trackEvent({
      data: { session_uid: publishedSessionUid },
      eventName: ANALYTICS_EVENTS.ONBOARDING.SESSIONS_LINK_COPIED,
    });
  };

  const handleShareLink = (channel: InviteLinkShareChannel) => {
    trackEvent({
      data: { channel, session_uid: publishedSessionUid ?? '' },
      eventName: ANALYTICS_EVENTS.ONBOARDING.SESSIONS_LINK_SHARED,
    });
  };

  return (
    <Box className="gap-4.5 pb-4.5">
      <BoxRow className="items-center gap-2.5">
        <Icon name="checked-circle-solid" color={COLORS.primary} size="md" />
        <String font="primaryExtraBold" className="flex-1">
          {t('on-boarding.sessions.invite.online')}
        </String>
      </BoxRow>
      <OnBoardingSessionsInviteLink
        url={sessionUrl}
        shareMessage={t('on-boarding.sessions.invite.share_message', {
          date: sessionDate,
          sport: sportLabel,
          url: sessionUrl,
        })}
        shareSubject={t('on-boarding.sessions.invite.share_subject', { sport: sportLabel })}
        onCopy={handleCopyLink}
        onShare={handleShareLink}
      />
      {hasPlayers && <String>{t('on-boarding.sessions.invite.intro', { date: sessionDate, sport: sportLabel })}</String>}
    </Box>
  );
};
