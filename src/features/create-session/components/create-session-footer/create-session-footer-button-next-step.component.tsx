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
      !!state.session?.gameMode &&
      !!state.session?.level &&
      !!state.session?.sport &&
      !!state.session?.visibility,
  );

  const isStep2Valid = useCreateSessionStore(
    state =>
      !!state.session?.fieldUid &&
      !!state.session?.startDate &&
      !!state.session?.endDate &&
      (!!state.session?.slotUid || !!state.session?.additionalData?.publicFieldSlotUid),
  );

  const handleButtonDisabled = useMemo(() => {
    if (activeStep === 1) {
      return isStep1Valid;
    }
    if (activeStep === 2) {
      return isStep2Valid;
    }
    return true;
  }, [activeStep, isStep1Valid, isStep2Valid]);

  const handleSubmit = async () => {
    const currentSession = useCreateSessionStore.getState().session;
    const { additionalData, endDate, fieldUid, gameMode, level, slotUid, sport, startDate, visibility } = currentSession || {};
    const { fieldType, price, pricePerPlayer } = additionalData || {};

    if (activeStep === 3 && fieldType === 'partner') {
      router.push(ROUTES.CREATE_SESSION.STEP_3_PAYMENT);
      return;
    }

    if (activeStep === 1 && currentSession) {
      trackEvent({
        data: {
          game_mode: gameMode,
          level,
          sport,
          visibility,
        },
        eventName: 'create_session_step_1_completed',
      });
      router.push(ROUTES.CREATE_SESSION.STEP_2);
    }
    if (activeStep === 2 && currentSession) {
      trackEvent({
        data: {
          end_date: endDate,
          field_uid: fieldUid,
          is_partner: fieldType === 'partner',
          price,
          price_per_player: pricePerPlayer,
          slot_uid: slotUid,
          start_date: startDate,
        },
        eventName: 'create_session_step_2_completed',
      });
      router.push(ROUTES.CREATE_SESSION.STEP_3);
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
  return <Button title={t('common.button_next')} isDisabled={!handleButtonDisabled} onPress={handleSubmit} />;
}
