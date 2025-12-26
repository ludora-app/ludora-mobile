import { list } from 'radash';
import { Box, String } from '@ludo/ui';
import React, { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolateColor,
  withDelay,
} from 'react-native-reanimated';

import COLORS from '@/constants/COLORS';

const TUBE_DURATION = 600;
const CIRCLE_DURATION = 400;

type CreateSessionStepsProps = {
  activeStep: number;
};
const AnimatedBox = Animated.createAnimatedComponent(Box);
const AnimatedString = Animated.createAnimatedComponent(String);

type StepCircleProps = {
  activeStep: number;
  step: number;
};

function StepCircle({ activeStep, step }: StepCircleProps) {
  const progress = useSharedValue(activeStep >= step ? 1 : 0);

  useEffect(() => {
    if (activeStep >= step) {
      // On garde votre logique de délai
      const delay = step === 1 ? 0 : TUBE_DURATION + 300;
      progress.value = withDelay(delay, withTiming(1, { duration: CIRCLE_DURATION }));
    } else {
      progress.value = withTiming(0, { duration: CIRCLE_DURATION });
    }
  }, [activeStep, step, progress]);

  // Style animé pour le fond du cercle
  const animatedBorderStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.value, [0, 1], ['rgba(0,0,0,0.1)', COLORS.primary]),
  }));

  // 2. Style animé pour la couleur du texte
  const animatedTextStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      progress.value,
      [0, 1],
      ['#000000', '#FFFFFF'], // Passe du noir au blanc
    ),
  }));

  return (
    <AnimatedBox style={animatedBorderStyle} className="size-14 items-center justify-center rounded-full">
      <AnimatedString style={animatedTextStyle} font="primaryBold">
        {step}
      </AnimatedString>
    </AnimatedBox>
  );
}

type StepConnectorProps = {
  activeStep: number;
  step: number;
};
function StepConnector({ activeStep, step }: StepConnectorProps) {
  const widthValue = useSharedValue(activeStep > step ? 100 : 0);

  useEffect(() => {
    if (activeStep > step) {
      widthValue.value = withDelay(CIRCLE_DURATION, withTiming(100, { duration: TUBE_DURATION }));
    } else {
      widthValue.value = withTiming(0, { duration: TUBE_DURATION });
    }
  }, [activeStep, step, widthValue]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${widthValue.value}%`,
  }));

  return (
    <Box className="mx-1 h-2 w-10 overflow-hidden rounded-full bg-black/10">
      <AnimatedBox style={animatedStyle} className="h-full bg-orange-500" />
    </Box>
  );
}

export default function CreateSessionProgressStepper({ activeStep = 1 }: CreateSessionStepsProps) {
  return (
    <Box className="flex-row items-center justify-center">
      {list(1, 4).map((step, index) => (
        <React.Fragment key={step}>
          <StepCircle step={step} activeStep={activeStep} />
          {index < 3 && <StepConnector step={step} activeStep={activeStep} />}
        </React.Fragment>
      ))}
    </Box>
  );
}
