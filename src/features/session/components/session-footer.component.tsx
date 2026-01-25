import { useMemo } from 'react';
import { Button, String } from '@ludo/ui';
import { ScrollView } from 'react-native';
import { useTranslate } from '@tolgee/react';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useLocalSearchParams, useRouter } from 'expo-router';

import ROUTES from '@/constants/ROUTES';
import COLORS from '@/constants/COLORS';
import { ErrorResponse } from '@/api/orval.instance';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { FindOneSessionResponseData } from '@/api/generated/model';
import { useInvalidateSessionsFindOne } from '@api/generated/invalidate-queries';
import FormSheetFooter from '@/components/ui/form-sheet/components/form-sheet-footer.component';

import { useJoinSession } from '../queries/join-session.query';
import { useSessionTeamStore } from '../stores/session-team.store';
import { SessionScreenLocalSearchParams } from '../types/session.types';

type SessionFooterProps = {
  session: FindOneSessionResponseData;
  scrollViewRef: React.RefObject<ScrollView>;
};

const AnimatedButton = Animated.createAnimatedComponent(Button);

export default function SessionFooter({ scrollViewRef, session }: SessionFooterProps) {
  const router = useRouter();
  const { id: sessionUid } = useLocalSearchParams<SessionScreenLocalSearchParams>();
  const invalidateSessionById = useInvalidateSessionsFindOne(sessionUid);
  const { t } = useTranslate();
  const { isJoined, remainingPlayers, sessionTeams } = session || {};
  const sideTeam = useSessionTeamStore(state => state.sideTeam);

  const isSessionFull = remainingPlayers === 0;

  const canJoinSession = !isSessionFull && !isJoined;

  const teamUid = useSessionTeamStore(state => state.teamUid);

  const { isPending: isJoiningSession, mutateAsync: joinSession } = useJoinSession(sessionUid);

  const { trackError, trackEvent } = useAnalytics();

  const handleButtonTitle = useMemo(() => {
    if (teamUid) {
      const selectedTeamName = sessionTeams?.find(team => team.teamUid === teamUid)?.teamName;
      return t('session.footer_button_join_team', { teamName: selectedTeamName });
    }
    return t('session.footer_button_select_team');
  }, [teamUid, sessionTeams, t]);

  const handleJoinSession = async () => {
    if (!teamUid) {
      scrollViewRef.current?.scrollTo({ animated: true, y: 0 });
      return;
    }
    try {
      await joinSession(teamUid);
      router.replace(ROUTES.SESSION.JOINED_UID(sessionUid));
      trackEvent({ data: { session_uid: sessionUid, team_uid: teamUid }, eventName: 'session_joined' });
    } catch (error) {
      const errorResponse = error as ErrorResponse;
      trackEvent({
        data: { error_message: errorResponse.api_error_detail },
        eventName: 'session_joined_failed',
      });
      invalidateSessionById();
      trackError(error);
    }
  };

  const handleCantJoinSession = () => {
    if (isJoined) {
      return t('session.footer_button_already_joined');
    }

    return t('session.footer_button_session_full');
  };

  const handleButtonColorVariant = useMemo(() => {
    if (!sideTeam) {
      return 'muted';
    }
    return sideTeam === 'left' ? 'primary' : 'secondary';
  }, [sideTeam]);

  const handleIconColor = useMemo(() => {
    if (!sideTeam) {
      return COLORS.muted;
    }
    return '#fff';
  }, [sideTeam]);

  return (
    <FormSheetFooter hasBottomSafeArea>
      {canJoinSession && (
        <AnimatedButton
          entering={FadeIn}
          title={handleButtonTitle}
          iconProps={{
            className: 'ml-2',
            color: handleIconColor,
            name: 'flash-solid',
            position: 'right',
          }}
          onPress={handleJoinSession}
          isLoading={isJoiningSession}
          colorVariant={handleButtonColorVariant}
        />
      )}
      {!canJoinSession && (
        <String className="text-center" colorVariant="primary" variant="body-3" font="primaryBold">
          {handleCantJoinSession()}
        </String>
      )}
    </FormSheetFooter>
  );
}
