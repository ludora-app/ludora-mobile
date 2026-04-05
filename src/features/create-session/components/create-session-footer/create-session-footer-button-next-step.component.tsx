import { Button } from '@ludo/ui';
import { useRouter } from 'expo-router';
import { useEffect, useMemo } from 'react';
import { useTranslate } from '@tolgee/react';

import ROUTES from '@/constants/routes.constants';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { useCreateSessionStore } from '@/features/create-session/store/create-session.store';

interface CreateSessionFooterButtonNextStepProps {
  activeStep: number;
}

const DELAY_TO_GO_TO_NEXT_STEP = 200;

export default function CreateSessionFooterButtonNextStep(props: CreateSessionFooterButtonNextStepProps) {
  const { activeStep } = props;
  const { t } = useTranslate();
  const router = useRouter();

  const { trackEvent } = useAnalytics();
  const autoGoToNextStep = useCreateSessionStore(state => state.session?.additionalData?.autoGoToNextStep);
  const setCreateSession = useCreateSessionStore(state => state.setSession);

  const isStep1Valid = useCreateSessionStore(
    state =>
      !!state.session?.gameMode && !!state.session?.level && !!state.session?.sport && !!state.session?.visibility,
  );

  const isStep2Valid = useCreateSessionStore(
    state =>
      !!state.session?.fieldUid &&
      !!state.session?.startDate &&
      !!state.session?.endDate &&
      (!!state.session?.slotUid || !!state.session?.additionalData?.publicFieldSlotUid),
  );

  const isStep3Valid = useCreateSessionStore(state => state.isStep3Valid);

  const handleButtonDisabled = useMemo(() => {
    if (activeStep === 1) {
      return isStep1Valid;
    }
    if (activeStep === 2) {
      return isStep2Valid;
    }
    if (activeStep === 3) {
      return isStep3Valid;
    }
    return true;
  }, [activeStep, isStep1Valid, isStep2Valid, isStep3Valid]);

  const handleSubmit = async () => {
    const currentSession = useCreateSessionStore.getState().session;
    const {
      additionalData,
      description,
      endDate,
      fieldUid,
      gameMode,
      level,
      slotUid,
      sport,
      startDate,
      teamAName,
      teamBName,
      title,
      visibility,
    } = currentSession || {};
    const { fieldType, price, pricePerPlayer } = additionalData || {};

    if (activeStep === 3 && fieldType === 'partner') {
      router.navigate(ROUTES.CREATE_SESSION.STEP_3_PAYMENT);
      return;
    }

    if (activeStep === 1 && currentSession) {
      if (gameMode === undefined || level === undefined || sport === undefined || visibility === undefined) {
        return;
      }
      trackEvent({
        data: {
          game_mode: gameMode,
          level,
          sport,
          visibility,
        },
        eventName: 'create_session_step_1_completed',
      });
      router.navigate(ROUTES.CREATE_SESSION.STEP_2);
    }
    if (activeStep === 2 && currentSession) {
      if (endDate === undefined || fieldUid === undefined || startDate === undefined) {
        return;
      }
      trackEvent({
        data: {
          end_date: endDate,
          field_uid: fieldUid,
          is_partner: fieldType === 'partner',
          price: price ?? 0,
          price_per_player: pricePerPlayer ?? 0,
          slot_uid: slotUid ?? '',
          start_date: startDate,
        },
        eventName: 'create_session_step_2_completed',
      });
      router.navigate(ROUTES.CREATE_SESSION.STEP_3);
    }
    if (activeStep === 3 && currentSession) {
      trackEvent({
        data: {
          has_description: !!description,
          has_team_a_name: !!teamAName,
          has_team_b_name: !!teamBName,
          has_title: !!title,
          title_source: additionalData?.titleSource ?? 'none',
        },
        eventName: 'create_session_step_3_completed',
      });
      router.navigate(ROUTES.CREATE_SESSION.STEP_4);
    }
  };

  useEffect(() => {
    if (isStep2Valid && autoGoToNextStep) {
      // the setTimeout is needed to let the formsheet close before the next step
      setTimeout(() => {
        handleSubmit();
      }, DELAY_TO_GO_TO_NEXT_STEP);
      setCreateSession({
        additionalData: {
          autoGoToNextStep: false,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStep2Valid, autoGoToNextStep]);
  return (
    <Button
      title={t('common.button_next')}
      isDisabled={!handleButtonDisabled}
      hasDisabledOpacity
      onPress={handleSubmit}
    />
  );
}
