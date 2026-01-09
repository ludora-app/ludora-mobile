import { Box, Wrapper } from '@ludo/ui';
import Animated, { FadeInRight } from 'react-native-reanimated';

import CreateSessionStep2Fields from './create-session-step-2-fields-list/create-session-step-2-fields-list.component';

const AnimatedBox = Animated.createAnimatedComponent(Box);
export default function CreateSessionStep2() {
  return (
    <AnimatedBox entering={FadeInRight} className="flex-1">
      <Wrapper fill>
        <CreateSessionStep2Fields />
      </Wrapper>
    </AnimatedBox>
  );
}
