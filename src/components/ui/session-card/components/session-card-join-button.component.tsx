import { useTranslate } from '@tolgee/react';
import { Button, ButtonProps } from '@ludo/ui';

import { ErrorResponse } from '@/api/orval.instance';
import { useJoinSession } from '@/queries/join-session.query';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { JoinSessionResponseData } from '@/api/generated/model';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants';

type SessionCardJoinButtonProps = {
  onJoinSuccess?: (data: JoinSessionResponseData) => void;
  sessionUid: string;
  size?: ButtonProps['size'];
};

/** Joins the session without a team: the API picks the one that needs the most players. */
export const SessionCardJoinButton = (props: SessionCardJoinButtonProps) => {
  const { onJoinSuccess, sessionUid, size } = props;
  const { t } = useTranslate();
  const { trackError, trackEvent } = useAnalytics();
  const { isPending: isJoiningSession, mutateAsync: joinSession } = useJoinSession(sessionUid);

  const handleJoin = async () => {
    try {
      const response = await joinSession();
      const data = response?.data;
      trackEvent({
        data: { session_uid: sessionUid, team_uid: data?.teamUid ?? '' },
        eventName: ANALYTICS_EVENTS.SESSION.SESSION_JOINED,
      });
      if (data) onJoinSuccess?.(data);
    } catch (error) {
      const errorResponse = error as ErrorResponse;
      trackEvent({
        data: { error_message: errorResponse?.api_error_detail ?? 'Unknown error', session_uid: sessionUid },
        eventName: ANALYTICS_EVENTS.SESSION.SESSION_JOINED_FAILED,
      });
      trackError({ error });
    }
  };

  return (
    <Button
      title={t('common.join')}
      colorVariant="secondary"
      size={size}
      isLoading={isJoiningSession}
      onPress={handleJoin}
    />
  );
};
