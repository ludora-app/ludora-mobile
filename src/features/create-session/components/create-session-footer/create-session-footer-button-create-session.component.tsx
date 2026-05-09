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
    const s = sessionStoreData;
    if (
      !s?.endDate ||
      !s.fieldUid ||
      !s.gameMode ||
      !s.sport ||
      !s.startDate ||
      !s.visibility ||
      !s.level ||
      !s.additionalData?.fieldType
    ) {
      throw new Error('Invalid session data');
    }
    try {
      const sessionData: CreateSessionFromRequestDto = {
        description: s?.description,
        endDate: s.endDate,
        fieldUid: s.fieldUid,
        gameMode: s.gameMode,
        level: s.level,
        sport: s.sport,
        startDate: s.startDate,
        teamAName: s?.teamAName,
        teamBName: s?.teamBName,
        title: s?.title,
        visibility: s.visibility,
      };
      const response = await createSession(sessionData);
      const createdSessionUid = response?.data?.uid;
      setCreatedSessionUid(createdSessionUid);
      trackEvent({
        data: {
          end_date: s.endDate,
          field_uid: s.fieldUid,
          game_mode: s.gameMode,
          has_description: !!sessionStoreData?.description,
          has_team_a_name: !!sessionStoreData?.teamAName,
          has_team_b_name: !!sessionStoreData?.teamBName,
          has_title: !!sessionStoreData?.title,
          is_partner: s.additionalData.fieldType === 'partner',
          level: s.level,
          session_visibility: s.visibility,
          sport: s.sport,
          start_date: s.startDate,
          title_source: s?.additionalData?.titleSource || 'none',
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
