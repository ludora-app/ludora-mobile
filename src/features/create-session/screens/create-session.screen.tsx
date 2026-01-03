import { useRef, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { WrapperGestureHandlerScrollView } from '@ludo/ui';

import CreateSessionHeader from '../components/create-session-header.component';
import CreateSessionFooter from '../components/create-session-footer.component';
import CreateSessionProgressStepper from '../components/create-session-progress-stepper.component';
import CreateSessionStep1 from '../components/create-session-steps/create-session-step-1/create-session-step-1.component';
import CreateSessionStep2 from '../components/create-session-steps/create-session-step-2/create-session-step-2.component';

export default function CreateSessionScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeStep, setActiveStep] = useState(1);

  const showStep1 = activeStep === 1;

  const showStep2 = activeStep === 2;

  return (
    <>
      <CreateSessionHeader setActiveStep={setActiveStep} />
      <CreateSessionProgressStepper activeStep={activeStep} />

      {showStep1 && (
        <WrapperGestureHandlerScrollView contentContainerClassName="gap-8 pb-4" ref={scrollViewRef}>
          <CreateSessionStep1 scrollViewRef={scrollViewRef} />
        </WrapperGestureHandlerScrollView>
      )}

      {showStep2 && <CreateSessionStep2 />}
      <CreateSessionFooter activeStep={activeStep} setActiveStep={setActiveStep} />
    </>
  );
}
