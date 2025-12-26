import { WrapperModal } from '@ludo/ui';

import CreateSessionHeader from '../components/create-session-header.component';
import CreateSessionFooter from '../components/create-session-footer.component';
import CreateSessionProgressStepper from '../components/create-session-progress-stepper.component';
import CreateSessionStep1 from '../components/create-session-steps/create-session-step-1/create-session-step-1.component';

export default function CreateSessionScreen() {
  return (
    <WrapperModal>
      <CreateSessionHeader />
      <CreateSessionProgressStepper />
      <CreateSessionStep1 />
      <CreateSessionFooter />
    </WrapperModal>
  );
}
