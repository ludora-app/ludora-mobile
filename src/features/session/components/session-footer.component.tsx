import React, { useMemo } from 'react';
import { useToast } from '@chillui/ui';
import { ScrollView } from 'react-native';
import { Button, String } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useInvalidateSessionsFindOne } from '@api/generated/invalidate-queries';

import ROUTES from '@/constants/routes.constants';
import COLORS from '@/constants/colors.contstants';
import { ErrorResponse } from '@/api/orval.instance';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { useChangeSessionTeam } from '@/queries/change-session-team.query';
import FormSheetFooter from '@/components/ui/form-sheet/components/form-sheet-footer.component';
import { ConversationCollectionResponseDataType, FindOneSessionResponseData } from '@/api/generated/model';

import { useJoinSession } from '../queries/join-session.query';
import { useSessionTeamStore } from '../stores/session-team.store';
import { SessionJoinedLocalParams, SessionScreenLocalSearchParams } from '../types/session.types';

type SessionFooterProps = {
  session: FindOneSessionResponseData;
  scrollViewRef: React.RefObject<ScrollView>;
};

const AnimatedButton = Animated.createAnimatedComponent(Button);

export default function SessionFooter({ scrollViewRef, session }: SessionFooterProps) {
  const router = useRouter();
  const { id: sessionUid } = useLocalSearchParams<SessionScreenLocalSearchParams>();
  const invalidateSessionById = useInvalidateSessionsFindOne();
  const { t } = useTranslate();
  const { toast } = useToast()
  const { fieldImages, isJoined, remainingPlayers, sessionTeams, title } = session || {};
  const sideTeam = useSessionTeamStore(state => state.sideTeam);

  const teamUid = useSessionTeamStore(state => state.teamUid);
  const { isPending: isJoiningSession, mutateAsync: joinSession } = useJoinSession(sessionUid || '');
  const { isPending: isSwitchingTeam, mutateAsync: switchTeam } = useChangeSessionTeam(sessionUid);

  const { trackError, trackEvent } = useAnalytics();

  const joinedTeam = sessionTeams?.find(team => team.isJoined);
  const isSwitching = !!joinedTeam && !!teamUid && joinedTeam.teamUid !== teamUid;

  const isSessionFull = remainingPlayers === 0;
  const canJoinSession = !isSessionFull && !isJoined;
  const canSwitchTeam = !isJoiningSession && !isSwitchingTeam && isSwitching;

  const showActionButton = canJoinSession || canSwitchTeam;

  const handleButtonTitle = useMemo(() => {
    if (isSwitching) {
      return t('session.footer_button_change_team');
    }
    if (teamUid) {
      const selectedTeamName = sessionTeams?.find(team => team.teamUid === teamUid)?.teamName;
      return t('session.footer_button_join_team', { teamName: selectedTeamName });
    }
    return t('session.footer_button_select_team');
  }, [teamUid, sessionTeams, t, isSwitching]);

  const handleAction = async () => {
    if (!teamUid || !sessionUid) {
      scrollViewRef.current?.scrollTo({ animated: true, y: 0 });
      return;
    }

    try {
      if (isSwitching) {
        await switchTeam(teamUid);
        trackEvent({ eventName: 'session_team_switched' });
        toast({ message: t('session.toast_team_switched_success'), variant: 'success' })
        return;
      }

      const response = await joinSession(teamUid);
      const { conversationUid, sessionUid: sessionUidResponse } = response?.data || {};

      const params: SessionJoinedLocalParams = {
        conversationUid,
        imageUrl: fieldImages?.[0]?.url,
        name: title,
        type: ConversationCollectionResponseDataType.SESSION,
      };
      router.replace({ params, pathname: ROUTES.SESSION.JOINED_UID(sessionUidResponse || '') });
      trackEvent({ data: { session_uid: sessionUidResponse || '', team_uid: teamUid }, eventName: 'session_joined' });
    } catch (error) {
      const errorResponse = error as ErrorResponse;
      trackEvent({
        data: { error_message: errorResponse.api_error_detail, session_uid: sessionUid },
        eventName: isSwitching ? 'session_team_switch_failed' : 'session_joined_failed',
      });
      invalidateSessionById(sessionUid);
      trackError({ error });
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
      {showActionButton && (
        <AnimatedButton
          entering={FadeIn}
          title={handleButtonTitle}
          iconProps={{
            className: 'ml-2',
            color: handleIconColor,
            name: 'flash-solid',
            position: 'right',
          }}
          onPress={handleAction}
          isLoading={isJoiningSession || isSwitchingTeam}
          colorVariant={handleButtonColorVariant}
        />
      )}
      {!showActionButton && (
        <String className="text-center" colorVariant="primary" variant="body-3" font="primaryBold">
          {handleCantJoinSession()}
        </String>
      )}
    </FormSheetFooter>
  );
}
