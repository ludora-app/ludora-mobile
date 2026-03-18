import FormSheetFooter from '@/components/ui/form-sheet/components/form-sheet-footer.component';

import { useGetCreateSessionStep } from '../../hooks/create-session-step.hook';
import { useCreateSessionLayoutStore } from '../../store/create-session-layout.store';
import CreateSessionFooterButtonNextStep from './create-session-footer-button-next-step.component';
import CreateSessionFooterButtonCreateSession from './create-session-footer-button-create-session.component';
import CreatedSessionFooterButtonsCreatedSession from './create-session-footer-buttons-created-session.component';

export default function CreateSessionFooter() {
  const setFooterHeight = useCreateSessionLayoutStore(state => state.setFooterHeight);
  const { activeStep } = useGetCreateSessionStep();
  const showNextStepButton = activeStep <= 3;
  const showCreateSessionButton = activeStep === 4;
  const showCreatedSessionButtons = activeStep === 5;

  return (
    <FormSheetFooter
      hasBottomSafeArea
      onLayout={e => setFooterHeight(e.nativeEvent.layout.height)}
    >
      {showNextStepButton && <CreateSessionFooterButtonNextStep activeStep={activeStep} />}
      {showCreateSessionButton && <CreateSessionFooterButtonCreateSession />}
      {showCreatedSessionButtons && <CreatedSessionFooterButtonsCreatedSession />}
    </FormSheetFooter>
  );
}
