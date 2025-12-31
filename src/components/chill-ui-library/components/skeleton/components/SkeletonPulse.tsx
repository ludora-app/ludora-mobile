import { PropsWithChildren, useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  useSharedValue,
} from 'react-native-reanimated';

import { Box } from '../../box';
import { cn } from '../../../utils/cn';
import { skeletonTv } from '../styles/Skeleton.styles';
import { SkeletonProps } from '../../../types/skeleton.types';

const AnimatedBox = Animated.createAnimatedComponent(Box);

export function SkeletonPulse(props: PropsWithChildren<SkeletonProps>) {
  const { children, className, size, variant, ...rest } = props;
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(withTiming(0.7, { duration: 1000 }), withTiming(0.3, { duration: 1000 })),
      -1,
      true,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return <AnimatedBox className={cn(skeletonTv({ size, variant }), className)} style={animatedStyle} {...rest} />;
}
