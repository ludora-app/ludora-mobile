import { Button } from '@ludo/ui';
import { useRouter } from 'expo-router';
import { useTranslate } from '@tolgee/react';

import ROUTES from '@/constants/routes.constants';
import { ErrorResponse } from '@/api/orval.instance';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { CreateSessionFromRequestDto } from '@/api/generated/model';
import { useCreateSession } from '@/features/create-session/queries/create-session.query';
import { useCreateSessionStore } from '@/features/create-session/store/create-session.store';


export default function CreateSessionFooterButtonCreateSession() {
  const router = useRouter();
  const { t } = useTranslate();
  const sessionStoreData = useCreateSessionStore(state => state.session);
  const setCreatedSessionUid = useCreateSessionStore(state => state.setCreatedSessionUid);
  const { trackError, trackEvent } = useAnalytics();
  const { isPending: isCreatingSession, mutateAsync: createSession } = useCreateSession();

  const handleSubmit = async () => {
    try {
      const sessionData: CreateSessionFromRequestDto = {
        description: sessionStoreData?.description,
        endDate: sessionStoreData.endDate,
        fieldUid: sessionStoreData.fieldUid,
        gameMode: sessionStoreData.gameMode,
        level: sessionStoreData.level,
        sport: sessionStoreData.sport,
        startDate: sessionStoreData.startDate,
        teamAName: sessionStoreData?.teamAName,
        teamBName: sessionStoreData?.teamBName,
        title: sessionStoreData?.title,
        visibility: sessionStoreData.visibility,
      };
      const response = await createSession(sessionData);
      const createdSessionUid = response?.data?.uid;
      setCreatedSessionUid(createdSessionUid);
      trackEvent({
        data: {
          end_date: sessionStoreData.endDate,
          field_uid: sessionStoreData.fieldUid,
          game_mode: sessionStoreData.gameMode,
          is_partner: sessionStoreData.additionalData.fieldType === 'partner',
          level: sessionStoreData.level,
          session_visibility: sessionStoreData.visibility,
          start_date: sessionStoreData.startDate,
        },
        eventName: 'create_session_completed',
      });
      router.dismissAll();
      router.replace(ROUTES.CREATE_SESSION.STEP_5);
    } catch (error) {
      const response = error as ErrorResponse;
      trackEvent({
        data: { error_message: response.api_error_detail || 'unknown_api_error' },
        eventName: 'create_session_failed',
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
