import { Wrapper } from '@ludo/ui';
import { StyleSheet } from 'react-native';
import { Dispatch, SetStateAction } from 'react';

import { useSafeArea } from '@/hooks/safe-area.hook';

import CreateSessionFooterButtonNextStep from './create-session-footer-button-next-step.component';
import CreateSessionFooterButtonCreateSession from './create-session-footer-button-create-session.component';
import CreatedSessionFooterButtonsCreatedSession from './create-session-footer-buttons-created-session.component';

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

  const { bottom } = useSafeArea();

  const showNextStepButton = activeStep < 3;
  const showCreateSessionButton = activeStep === 3;
  const showCreatedSessionButtons = activeStep === 4;

  return (
    <Wrapper
      style={[styles.footer, { paddingBottom: bottom }]}
      className="items-center justify-center bg-background py-2"
    >
      {false && <CreateSessionFooterButtonNextStep activeStep={activeStep} setActiveStep={setActiveStep} />}
      {false && <CreateSessionFooterButtonCreateSession setActiveStep={setActiveStep} />}
      {true && <CreatedSessionFooterButtonsCreatedSession />}
    </Wrapper>
  );
}
