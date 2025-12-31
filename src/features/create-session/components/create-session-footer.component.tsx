import { StyleSheet } from 'react-native';
import { Button, Wrapper } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';
import { Dispatch, SetStateAction, useMemo } from 'react';

import { useSafeArea } from '@/hooks/safe-area.hook';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';

import { useCreateSessionStore } from '../store/create-session.store';

const styles = StyleSheet.create({
  footer: {
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: {
      height: -10,
      width: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
  },
});

type CreateSessionFooterProps = {
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
};

export default function CreateSessionFooter(props: CreateSessionFooterProps) {
  const { activeStep, setActiveStep } = props;
  const { trackEvent } = useAnalytics();
  const { bottom } = useSafeArea();

  const { t } = useTranslate();
  const isStep1Valid = useCreateSessionStore(
    state => !!state.session?.gameMode && !!state.session?.level && !!state.session?.sport,
  );

  const handleButtonDisabled = useMemo(() => {
    if (activeStep === 1) {
      return isStep1Valid;
    }
    return true;
  }, [activeStep, isStep1Valid]);

  const handleSubmit = () => {
    const currentSession = useCreateSessionStore.getState().session;
    trackEvent({
      eventName: 'create_session_step_1_completed',
      properties: {
        game_mode: currentSession?.gameMode,
        level: currentSession?.level,
        sport: currentSession?.sport,
      },
    });
    setActiveStep(prev => prev + 1);
  };

  return (
    <Wrapper
      style={[styles.footer, { paddingBottom: bottom }]}
      className="items-center justify-center bg-background py-2"
    >
      <Button title={t('common.button_next')} isDisabled={!handleButtonDisabled} onPress={handleSubmit} />
    </Wrapper>
  );
}
