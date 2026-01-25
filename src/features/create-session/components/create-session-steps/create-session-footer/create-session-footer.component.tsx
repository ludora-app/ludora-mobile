import { Wrapper } from '@ludo/ui';
import { StyleSheet } from 'react-native';
import { Dispatch, SetStateAction } from 'react';

import { useSafeArea } from '@/hooks/safe-area.hook';

import CreateSessionFooterButtonNextStep from './create-session-footer-button-next-step.component';
import CreateSessionFooterButtonCreateSession from './create-session-footer-button-create-session.component';
import CreatedSessionFooterButtonsCreatedSession from './create-session-footer-buttons-created-session.component';
import FormSheetFooter from '@/components/ui/form-sheet/components/form-sheet-footer.component';

type CreateSessionFooterProps = {
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
};

export default function CreateSessionFooter(props: CreateSessionFooterProps) {
  const { activeStep, setActiveStep } = props;

  const showNextStepButton = activeStep < 3;
  const showCreateSessionButton = activeStep === 4;
  const showCreatedSessionButtons = activeStep === 5;

  if (activeStep === 3) {
    return null;
  }

  return (
    <FormSheetFooter hasBottomSafeArea>
      {showNextStepButton && (
        <CreateSessionFooterButtonNextStep activeStep={activeStep} setActiveStep={setActiveStep} />
      )}
      {showCreateSessionButton && <CreateSessionFooterButtonCreateSession setActiveStep={setActiveStep} />}
      {showCreatedSessionButtons && <CreatedSessionFooterButtonsCreatedSession />}
    </FormSheetFooter>
  );
}
