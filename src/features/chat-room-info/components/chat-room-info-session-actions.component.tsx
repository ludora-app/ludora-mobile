import { Box, Button } from '@ludo/ui';
import { useToast } from '@chillui/ui';
import { useRouter } from 'expo-router';
import { useTranslate } from '@tolgee/react';

import ROUTES from '@/constants/routes.constants';
import COLORS from '@/constants/colors.contstants';
import { ErrorResponse } from '@/api/orval.instance';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { FindOneSessionResponseData } from '@/api/generated/model';
import { DialogConfirm } from '@/components/ui/dialog/dialog-confirm';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants';
import { useChatRoomSessionTeam } from '@/features/chat-room/utils/chat-room-session-team.utils';

import { useLeaveSession } from '../queries/leave-session.query';

type ChatRoomInfoSessionActionsProps = {
  sessionUid: string;
  session: FindOneSessionResponseData;
};

const ERROR_SESSION_STARTED = 'You cannot leave a session after it has started';

export default function ChatRoomInfoSessionActions({ session, sessionUid }: ChatRoomInfoSessionActionsProps) {
  const { trackError, trackEvent } = useAnalytics();
  const { t } = useTranslate();
  const router = useRouter();
  const { toast } = useToast();
  const { isPending: isLeavingSession, mutateAsync: leaveSession } = useLeaveSession(sessionUid);
  const { isJoined } = session || {};
  const { isTeamA } = useChatRoomSessionTeam();

  const handleInviteFriends = () => {
    router.navigate(ROUTES.INVITE_FRIENDS.INDEX_UID(sessionUid));
  };

  const handleLeaveMatch = async () => {
    try {
      await leaveSession();
      router.dismissTo(ROUTES.TABS.MESSAGES);
      trackEvent({ data: { session_uid: sessionUid }, eventName: ANALYTICS_EVENTS.SESSION.SESSION_LEFT });
    } catch (error) {
      const errorResponse = error as ErrorResponse;
      if (errorResponse.api_error_detail === ERROR_SESSION_STARTED) {
        toast({
          message: t('chat-room.error_session_already_started'),
          variant: 'warning',
        });
        return;
      }
      trackEvent({
        data: { error_message: errorResponse?.api_error_detail ?? 'Unknown error', session_uid: sessionUid },
        eventName: ANALYTICS_EVENTS.SESSION.SESSION_LEFT_FAILED,
      });
      trackError({ error });
    }
  };

  return (
    <Box className="gap-3">
      <Button
        title={t('chat.info_session_invite_friends', 'Inviter des amis')}
        iconProps={{ className: 'mr-2', name: 'user-add-solid', position: 'left' }}
        colorVariant={isTeamA ? 'primary' : 'secondary'}
        onPress={handleInviteFriends}
      />

      {isJoined && (
        <DialogConfirm
          title={t('chat-room.info_session_leave')}
          content={t('chat-room.info_session_leave_content')}
          showIcon
          onConfirmPromise={handleLeaveMatch}
          source="chat_room_info_private_leave_match"
          confirmButtonTitleKey="common.leave"
          centerContent
          isLoading={isLeavingSession}
        >
          <Button
            title={t('chat-room.info_session_leave')}
            iconProps={{ className: 'mr-2', color: COLORS.danger, name: 'close-circle-regular', position: 'left' }}
            colorVariant="danger"
            variant="outlined"
            loaderProps={{ color: COLORS.danger }}
          />
        </DialogConfirm>
      )}
    </Box>
  );
}
