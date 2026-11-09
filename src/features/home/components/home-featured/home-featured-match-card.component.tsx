import { useMemo } from 'react';
import { useTranslate } from '@tolgee/react';
import { Box, BoxRow, Button } from '@ludo/ui';

import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants';
import { SessionCard, SessionCardJoinButton } from '@/components/ui/session-card';
import { JoinSessionResponseData, SessionCollectionItemDto } from '@/api/generated/model';

import { getMatchReasons } from '../../utils/home-match-reasons.utils';
import { useHomeFeaturedStore } from '../../stores/home-featured.store';
import { useGetMyPreferences } from '../../queries/get-my-preferences.query';
import { HomeFeaturedMatchReasons } from './home-featured-match-reasons.component';

type HomeFeaturedMatchCardProps = {
  session: SessionCollectionItemDto;
};

/**
 * "LA session pour toi": the best recommended session with its reasons. "Rejoindre" joins with a team picked by the
 * server; "Pas pour moi" features the next suggestion.
 */
export const HomeFeaturedMatchCard = (props: HomeFeaturedMatchCardProps) => {
  const { session } = props;
  const { t } = useTranslate();
  const { trackEvent } = useAnalytics();
  const { availabilities, sportPreferences } = useGetMyPreferences();
  const dismissSession = useHomeFeaturedStore(state => state.dismissSession);

  const reasons = useMemo(
    () => getMatchReasons({ availabilities, session, sportPreferences }),
    [availabilities, session, sportPreferences],
  );

  // The header switches to the next match card on its own: joining invalidates the player's sessions
  const handleJoinSuccess = ({ teamUid }: JoinSessionResponseData) => {
    trackEvent({
      data: { session_uid: session.uid, team_uid: teamUid },
      eventName: ANALYTICS_EVENTS.HOME.FEATURED_SESSION_JOINED,
    });
  };

  const handleNotForMe = () => {
    trackEvent({ data: { session_uid: session.uid }, eventName: ANALYTICS_EVENTS.HOME.FEATURED_NOT_FOR_ME_PRESSED });
    dismissSession(session.uid);
  };

  return (
    <SessionCard
      item={session}
      footer={
        <Box className="gap-3.5">
          <HomeFeaturedMatchReasons reasons={reasons} />
          <BoxRow className="gap-2.5">
            <Box className="flex-1">
              <SessionCardJoinButton sessionUid={session.uid} size="md" onJoinSuccess={handleJoinSuccess} />
            </Box>
            <Button title={t('home.featured.not_for_me')} colorVariant="muted" size="md" fit onPress={handleNotForMe} />
          </BoxRow>
        </Box>
      }
    />
  );
};
