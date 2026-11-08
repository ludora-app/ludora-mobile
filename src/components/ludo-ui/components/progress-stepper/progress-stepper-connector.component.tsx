import { useEffect } from 'react';
import Animated, { withDelay, withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

import { Box } from '../box';
import { ProgressStepperItemProps } from '../../types/progress-stepper.types';
import { PROGRESS_STEPPER_CIRCLE_DURATION, PROGRESS_STEPPER_CONNECTOR_DURATION } from './progress-stepper.constants';

const AnimatedBox = Animated.createAnimatedComponent(Box);

export const ProgressStepperConnector = (props: ProgressStepperItemProps) => {
  const { activeStep, step } = props;
  const width = useSharedValue(activeStep > step ? 100 : 0);

  useEffect(() => {
    if (activeStep > step) {
      width.value = withDelay(
        PROGRESS_STEPPER_CIRCLE_DURATION,
        withTiming(100, { duration: PROGRESS_STEPPER_CONNECTOR_DURATION }),
      );
    } else {
      width.value = withTiming(0, { duration: PROGRESS_STEPPER_CONNECTOR_DURATION });
    }
  }, [activeStep, step, width]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
  }));

  return (
    <Box className="mx-1.5 h-1.5 w-9 overflow-hidden rounded-full bg-darkSoft">
      <AnimatedBox style={animatedStyle} className="h-full bg-primary" />
    </Box>
  );
};
