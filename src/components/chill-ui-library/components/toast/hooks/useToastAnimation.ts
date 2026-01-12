import { useCallback } from 'react';
import { Dimensions } from 'react-native';
import { scheduleOnRN } from 'react-native-worklets';
import { useSharedValue, withTiming, Easing } from 'react-native-reanimated';

export type ToastPosition = 'top' | 'bottom';

const ANIMATION_DURATION = 500;
const DEFAULT_POSITION_OFFSET = 300;

export const useToastAnimation = () => {
  const screenWidth = Dimensions.get('window').width;

  // Shared Values (Reanimated)
  const translateY = useSharedValue(DEFAULT_POSITION_OFFSET);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const progressWidth = useSharedValue(0);
  const isAnimating = useSharedValue(false);

  const hideToast = useCallback(
    (position: ToastPosition) => {
      const offset = position === 'top' ? -DEFAULT_POSITION_OFFSET : DEFAULT_POSITION_OFFSET;

      return new Promise<void>(resolve => {
        const config = { duration: ANIMATION_DURATION, easing: Easing.in(Easing.cubic) };

        opacity.value = withTiming(0, config);
        scale.value = withTiming(0.8, config);
        translateY.value = withTiming(offset, config, finished => {
          if (finished) {
            isAnimating.value = false;
            scheduleOnRN(resolve);
          }
        });
      });
    },
    [opacity, translateY, scale, isAnimating],
  );

  const showToast = useCallback(
    (position: ToastPosition, duration: number) => {
      if (isAnimating.value) return Promise.resolve();

      isAnimating.value = true;

      // Reset values
      translateY.value = position === 'top' ? -DEFAULT_POSITION_OFFSET : DEFAULT_POSITION_OFFSET;
      opacity.value = 0;
      scale.value = 0.8;
      progressWidth.value = 0;

      return new Promise<void>(resolve => {
        const config = { duration: ANIMATION_DURATION, easing: Easing.out(Easing.cubic) };

        opacity.value = withTiming(1, config);
        scale.value = withTiming(1, config);
        translateY.value = withTiming(0, config);

        // Barre de progression
        progressWidth.value = withTiming(
          screenWidth,
          {
            duration,
            easing: Easing.linear,
          },
          finished => {
            if (finished) scheduleOnRN(resolve);
          },
        );
      });
    },
    [screenWidth, translateY, opacity, scale, progressWidth, isAnimating],
  );

  return {
    hideToast,
    opacity,
    progressWidth,
    scale,
    showToast,
    translateY,
  };
};
