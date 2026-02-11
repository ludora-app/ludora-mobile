import { Wrapper } from '@ludo/ui';

import { useOnBoardingStore } from '../stores/on-boarding.store';
import OnBoardingStep4FieldsList from '../components/on-boarding-step-4/on-boarding-step-4-fields-list.component';

export default function OnBoardingStep4Screen() {
  const sportPreferences = useOnBoardingStore(state => state.sportPreferences);
  return (
    <Wrapper fill>
      <OnBoardingStep4FieldsList />
    </Wrapper>
  );
}
