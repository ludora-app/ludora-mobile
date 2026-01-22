import { useCallback, useState } from 'react';

import { useResetStoreOnUnmount } from '@/utils/navigation.utils';

import { useCreateSessionStore } from '../store/create-session.store';
import CreateSessionHeader from '../components/create-session-header.component';
import { useCreateSessionFiltersFieldsStore } from '../store/create-session-filters-fields.store';
import CreateSessionProgressStepper from '../components/create-session-progress-stepper.component';
import CreateSessionStep1 from '../components/create-session-steps/create-session-step-1/create-session-step-1.component';
import CreateSessionStep2 from '../components/create-session-steps/create-session-step-2/create-session-step-2.component';
import CreateSessionStep3 from '../components/create-session-steps/create-session-step-3/create-session-step-3.component';
import CreateSessionStep4 from '../components/create-session-steps/create-session-step-4/create-session-step-4.component';
import CreateSessionFooter from '../components/create-session-steps/create-session-footer/create-session-footer.component';

export default function CreateSessionScreen() {

  const resetCreateSession = useCreateSessionStore(state => state.reset);
  const resetFieldsFilter = useCreateSessionFiltersFieldsStore(state => state.reset);
  const [activeStep, setActiveStep] = useState(1);

  const handleReset = useCallback(() => {
    resetCreateSession();
    resetFieldsFilter();
  }, [resetCreateSession, resetFieldsFilter]);

  useResetStoreOnUnmount(handleReset);

  const showStep1 = activeStep === 1;

  const showStep2 = activeStep === 2;

  const showStep3 = activeStep === 3;

  const showStep4 = activeStep === 4;

  return (
    <>
      <CreateSessionHeader setActiveStep={setActiveStep} activeStep={activeStep} />

      <CreateSessionProgressStepper activeStep={activeStep} />

      {showStep1 && <CreateSessionStep1 />}
      {showStep2 && <CreateSessionStep2 />}
      {showStep3 && <CreateSessionStep3 />}

      {showStep4 && <CreateSessionStep4 />}

      <CreateSessionFooter activeStep={activeStep} setActiveStep={setActiveStep} />
    </>
  );
}
