import { memo } from 'react';
import { useRouter } from 'expo-router';

import ROUTES from '@/constants/routes.constants';
import { SessionCard } from '@/components/ui/session-card';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants';
import { JoinSessionResponseData, SessionCollectionItemDto } from '@/api/generated/model';

type OnBoardingSessionsSuggestionsItemProps = {
  item: SessionCollectionItemDto;
};

function OnBoardingSessionsSuggestionsItem({ item }: OnBoardingSessionsSuggestionsItemProps) {
  const router = useRouter();
  const { trackEvent } = useAnalytics();

  const handleJoinSuccess = ({ teamUid }: JoinSessionResponseData) => {
    trackEvent({
      data: { session_uid: item.uid, team_uid: teamUid },
      eventName: ANALYTICS_EVENTS.ONBOARDING.SESSIONS_JOINED,
    });
    router.replace({ params: { sessionUid: item.uid }, pathname: ROUTES.ON_BOARDING.SESSIONS_JOINED });
  };

  return <SessionCard item={item} variant="suggestion" hasJoinButton onJoinSuccess={handleJoinSuccess} />;
}

export default memo(OnBoardingSessionsSuggestionsItem);
