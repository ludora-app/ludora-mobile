import { Button } from '@ludo/ui';
import { useRouter } from 'expo-router';
import { useTranslate } from '@tolgee/react';
import { Dispatch, SetStateAction, useMemo } from 'react';

import ROUTES from '@/constants/ROUTES';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { useCreateSessionStore } from '@/features/create-session/store/create-session.store';

type CreateSessionFooterButtonNextStepProps = {
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
};

export default function CreateSessionFooterButtonNextStep(props: CreateSessionFooterButtonNextStepProps) {
  const { t } = useTranslate();
  const router = useRouter();
  const { activeStep, setActiveStep } = props;
  const { trackEvent } = useAnalytics();

  const isStep1Valid = useCreateSessionStore(
    state =>
      !!state.session?.gameMode &&
      !!state.session?.level &&
      !!state.session?.additionalData?.sport &&
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
    const { additionalData, endDate, fieldUid, gameMode, level, slotUid, startDate, visibility } = currentSession || {};
    const { fieldType, price, pricePerPlayer, sport } = additionalData || {};

    if (activeStep === 3 && fieldType === 'partner') {
      router.push(ROUTES.CREATE_SESSION.STEP_3_PAYMENT);
      return;
    }

    if (activeStep === 1 && currentSession) {
      trackEvent({
        eventName: 'create_session_step_1_completed',
        properties: {
          game_mode: gameMode,
          level,
          sport,
          visibility,
        },
      });
    }
    if (activeStep === 2 && currentSession) {
      trackEvent({
        eventName: 'create_session_step_2_completed',
        properties: {
          end_date: endDate,
          field_uid: fieldUid,
          is_partner: fieldType === 'partner',
          price,
          price_per_player: pricePerPlayer,
          slot_uid: slotUid,
          start_date: startDate,
        },
      });
    }
    setActiveStep(prev => prev + 1);
  };
  return <Button title={t('common.button_next')} isDisabled={!handleButtonDisabled} onPress={handleSubmit} />;
}
