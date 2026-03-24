import { useEffect } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';

/**
 * Individual ripple effect component using react-native-reanimated
 */
interface RippleEffectProps {
  x: number;
  y: number;
  duration: number;
  effectColor: string;
  containerWidth: number;
  containerHeight: number;
}

const BASE_SIZE = 20;
const OPACITY_DELAY_RATIO = 0.3;
const OPACITY_DURATION_RATIO = 0.9;
const SCALE_MULTIPLIER = 2.2;

export function RippleEffect({ containerHeight, containerWidth, duration, effectColor, x, y }: RippleEffectProps) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0.6);

  const distanceToCorners = [
    Math.sqrt(x * x + y * y),
    Math.sqrt((containerWidth - x) ** 2 + y * y),
    Math.sqrt(x * x + (containerHeight - y) ** 2),
    Math.sqrt((containerWidth - x) ** 2 + (containerHeight - y) ** 2),
  ];

  const maxDistance = Math.max(...distanceToCorners);
  const finalScale = (maxDistance * SCALE_MULTIPLIER) / BASE_SIZE;

  useEffect(() => {
    scale.value = withTiming(finalScale, { duration });
    opacity.value = withDelay(
      Math.round(duration * OPACITY_DELAY_RATIO),
      withTiming(0, { duration: Math.round(duration * OPACITY_DURATION_RATIO) }),
    );
  }, [scale, opacity, finalScale, duration]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      style={[
        {
          backgroundColor: effectColor,
          borderRadius: BASE_SIZE / 2,
          height: BASE_SIZE,
          left: x - BASE_SIZE / 2,
          pointerEvents: 'none',
          position: 'absolute',
          top: y - BASE_SIZE / 2,
          width: BASE_SIZE,
        },
        animatedStyle,
      ]}
    />
  );
}
