import FormSheetFooter from '@/components/ui/form-sheet/components/form-sheet-footer.component';

import { useGetCreateSessionStep } from '../../hooks/create-session-step.hook';
import CreateSessionFooterButtonNextStep from './create-session-footer-button-next-step.component';
import CreateSessionFooterButtonCreateSession from './create-session-footer-button-create-session.component';
import CreatedSessionFooterButtonsCreatedSession from './create-session-footer-buttons-created-session.component';

export default function CreateSessionFooter() {
  const { activeStep } = useGetCreateSessionStep();
  const showNextStepButton = activeStep < 3;
  const showCreateSessionButton = activeStep === 4;
  const showCreatedSessionButtons = activeStep === 5;

  if (activeStep === 3) {
    return null;
  }

  return (
    <FormSheetFooter hasBottomSafeArea>
      {showNextStepButton && <CreateSessionFooterButtonNextStep activeStep={activeStep} />}
      {showCreateSessionButton && <CreateSessionFooterButtonCreateSession />}
      {showCreatedSessionButtons && <CreatedSessionFooterButtonsCreatedSession />}
    </FormSheetFooter>
  );
}
