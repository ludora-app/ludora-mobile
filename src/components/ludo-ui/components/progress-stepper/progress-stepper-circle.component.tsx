import { useEffect } from 'react';
import Animated, {
  withDelay,
  withTiming,
  useSharedValue,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';

import COLORS from '@/constants/colors.contstants';

import { Box } from '../box';
import { String } from '../string';
import { ProgressStepperItemProps } from '../../types/progress-stepper.types';
import { PROGRESS_STEPPER_CIRCLE_DURATION, PROGRESS_STEPPER_CONNECTOR_DURATION } from './progress-stepper.constants';

const AnimatedBox = Animated.createAnimatedComponent(Box);
const AnimatedString = Animated.createAnimatedComponent(String);

export const ProgressStepperCircle = (props: ProgressStepperItemProps) => {
  const { activeStep, step } = props;
  const progress = useSharedValue(activeStep >= step ? 1 : 0);

  useEffect(() => {
    if (activeStep >= step) {
      const delay = step === 1 ? 0 : PROGRESS_STEPPER_CONNECTOR_DURATION + 300;
      progress.value = withDelay(delay, withTiming(1, { duration: PROGRESS_STEPPER_CIRCLE_DURATION }));
    } else {
      progress.value = withTiming(0, { duration: PROGRESS_STEPPER_CIRCLE_DURATION });
    }
  }, [activeStep, step, progress]);

  const animatedCircleStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.value, [0, 1], [COLORS.darkSoft, COLORS.primary]),
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    color: interpolateColor(progress.value, [0, 1], [COLORS.dark, COLORS.white]),
  }));

  return (
    <AnimatedBox style={animatedCircleStyle} className="size-8 items-center justify-center rounded-full">
      <AnimatedString style={animatedTextStyle} font="primaryExtraBold" variant="body-sm">
        {step}
      </AnimatedString>
    </AnimatedBox>
  );
};
