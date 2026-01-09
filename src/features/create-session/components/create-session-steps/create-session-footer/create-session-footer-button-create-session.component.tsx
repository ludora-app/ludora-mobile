import { Button } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';
import { Dispatch, SetStateAction } from 'react';

import { ErrorResponse } from '@/api/orval.instance';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { CreateSessionFromRequestDto } from '@/api/generated/model';
import { useCreateSession } from '@/features/create-session/queries/create-session.query';
import { useCreateSessionStore } from '@/features/create-session/store/create-session.store';

type CreateSessionFooterButtonCreateSessionProps = {
  setActiveStep: Dispatch<SetStateAction<number>>;
};

export default function CreateSessionFooterButtonCreateSession(props: CreateSessionFooterButtonCreateSessionProps) {
  const { setActiveStep } = props;
  const { t } = useTranslate();
  const sessionStoreData = useCreateSessionStore(state => state.session);
  const setCreateSession = useCreateSessionStore(state => state.setSession);
  const { trackError, trackEvent } = useAnalytics();
  const { isPending: isCreatingSession, mutateAsync: createSession } = useCreateSession();

  const handleSubmit = async () => {
    try {
      const sessionData: CreateSessionFromRequestDto = {
        endDate: sessionStoreData.endDate,
        fieldUid: sessionStoreData.fieldUid,
        gameMode: sessionStoreData.gameMode,
        level: sessionStoreData.level,
        startDate: sessionStoreData.startDate,
        visibility: sessionStoreData.visibility,
      };
      const response = await createSession(sessionData);
      const createdSessionUid = response.data.uid;
      setCreateSession({ additionalData: { createdSessionUid } });
      trackEvent({
        eventName: 'create_session_completed',
        properties: {
          end_date: sessionStoreData.endDate,
          field_uid: sessionStoreData.fieldUid,
          game_mode: sessionStoreData.gameMode,
          is_partner: sessionStoreData.additionalData.fieldType === 'partner',
          level: sessionStoreData.level,
          session_visibility: sessionStoreData.visibility,
          start_date: sessionStoreData.startDate,
        },
      });
      setActiveStep(prev => prev + 1);
    } catch (error) {
      const response = error as ErrorResponse;
      trackEvent({
        eventName: 'create_session_failed',
        properties: { error_message: response.api_error_detail || 'unknown_api_error' },
      });
      trackError({ error });
    }
  };
  return (
    <Button
      title={t('create-session.step-3.button_title_create_session')}
      onPress={handleSubmit}
      isLoading={isCreatingSession}
    />
  );
}
