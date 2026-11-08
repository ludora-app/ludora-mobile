import { useMemo } from 'react';
import { useToast } from '@chillui/ui';
import { useRouter } from 'expo-router';
import { useTranslate } from '@tolgee/react';
import { GetListFixedItemSize, List } from '@ludo/ui';

import ROUTES from '@/constants/routes.constants';
import { HeaderRounded } from '@/components/ui/header';
import { useDisableBack } from '@/hooks/navigation.hooks';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { formatSessionStartDate } from '@/utils/sessions.utils';
import { Loading } from '@/components/ui/loading/loading.component';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants';

import { useGetPreparedSession } from '../queries/get-prepared-session.query';
import { useGetCompatiblePlayers } from '../queries/get-compatible-players.query';
import { useOnBoardingSessionsStore } from '../../stores/on-boarding-sessions.store';
import { usePublishPreparedSession } from '../queries/publish-prepared-session.query';
import OnBoardingSessionsInvitePlayer from '../components/on-boarding-sessions-invite/on-boarding-sessions-invite-player.component';
import { OnBoardingSessionsInviteEmpty } from '../components/on-boarding-sessions-invite/on-boarding-sessions-invite-empty.component';
import { OnBoardingSessionsInviteHeader } from '../components/on-boarding-sessions-invite/on-boarding-sessions-invite-header.component';
import { OnBoardingSessionsInviteFooter } from '../components/on-boarding-sessions-invite/on-boarding-sessions-invite-footer.component';
import { OnBoardingSessionsInvitePlayerSkeleton } from '../components/on-boarding-sessions-invite/on-boarding-sessions-invite-player-skeleton.component';

// Card 72 + margin 10
const PLAYER_ITEM_HEIGHT = 90;

const GET_FIXED_ITEM_SIZE: GetListFixedItemSize = (_item, _index, type) =>
  type === 'row' || type === 'skeleton' ? PLAYER_ITEM_HEIGHT : undefined;

export const OnBoardingSessionsInviteScreen = () => {
  const { t } = useTranslate();
  const router = useRouter();
  const { toast } = useToast();
  const { trackError, trackEvent } = useAnalytics();
  const invitedUserUids = useOnBoardingSessionsStore(state => state.invitedUserUids);
  const publishedSessionUid = useOnBoardingSessionsStore(state => state.publishedSessionUid);
  const { field, isLoading, preparedSession } = useGetPreparedSession();
  const { invite, isPending } = usePublishPreparedSession();
  const {
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isLoading: isLoadingPlayers,
    isRefetching,
    players,
    refetch,
  } = useGetCompatiblePlayers({ fieldUid: field?.uid, preparedSession });

  const invitedCount = invitedUserUids.length;
  const hasPlayers = players.length > 0;
  const sessionDate = preparedSession ? formatSessionStartDate(preparedSession.startDate.toISOString()) : '';
  const sportLabel = preparedSession ? t(`common.session_sport_${preparedSession.sport}`).toLowerCase() : '';

  useDisableBack();

  const listHeaderComponent = useMemo(
    () => <OnBoardingSessionsInviteHeader hasPlayers={hasPlayers} sessionDate={sessionDate} sportLabel={sportLabel} />,
    [hasPlayers, sessionDate, sportLabel],
  );

  const handleFinish = async () => {
    if (!publishedSessionUid || invitedCount === 0) {
      router.dismissTo(ROUTES.HOME.INDEX);
      return;
    }
    try {
      await invite({ receiverUids: invitedUserUids, sessionUid: publishedSessionUid });
      trackEvent({
        data: { invited_count: invitedCount, session_uid: publishedSessionUid },
        eventName: ANALYTICS_EVENTS.ONBOARDING.PREPARED_SESSION_PLAYERS_INVITED,
      });
      toast({ message: t('on-boarding.sessions.invite.invited_success'), variant: 'success' });
      router.dismissTo(ROUTES.HOME.INDEX);
    } catch (error) {
      trackError({ error, extra: { context: 'OnBoardingSessionsInviteScreen' } });
    }
  };

  return (
    <>
      <HeaderRounded title={t('on-boarding.sessions.invite.title')} />
      {isLoading ? (
        <Loading />
      ) : (
        <List
          data={players}
          ItemComponent={OnBoardingSessionsInvitePlayer}
          SkeletonComponent={OnBoardingSessionsInvitePlayerSkeleton}
          EmptyComponent={OnBoardingSessionsInviteEmpty}
          ListHeaderComponent={listHeaderComponent}
          getFixedItemSize={GET_FIXED_ITEM_SIZE}
          isError={isError}
          isLoading={isLoadingPlayers}
          isRefetching={isRefetching}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          refetch={refetch}
          contentContainerClassName="px-4 pt-5.5 pb-6"
        />
      )}
      <OnBoardingSessionsInviteFooter invitedCount={invitedCount} isLoading={isPending} onPress={handleFinish} />
    </>
  );
};
