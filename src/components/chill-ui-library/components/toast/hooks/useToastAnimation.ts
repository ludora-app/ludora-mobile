import { Dimensions } from 'react-native';
import { useCallback, useRef } from 'react';
import { scheduleOnRN } from 'react-native-worklets';
import { useSharedValue, withTiming, Easing } from 'react-native-reanimated';

export type ToastPosition = 'top' | 'bottom';

const ANIMATION_DURATION = 500;
const DEFAULT_POSITION_OFFSET = 300;

export const useToastAnimation = () => {
  const screenWidth = Dimensions.get('window').width;

  const translateY = useSharedValue(DEFAULT_POSITION_OFFSET);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const progressWidth = useSharedValue(0);

  const translateYRef = useRef(translateY);
  const opacityRef = useRef(opacity);
  const scaleRef = useRef(scale);
  const progressWidthRef = useRef(progressWidth);
  const isAnimatingRef = useRef(false);

  const hideToast = useCallback((position: ToastPosition) => {
    const offset = position === 'top' ? -DEFAULT_POSITION_OFFSET : DEFAULT_POSITION_OFFSET;

    return new Promise<void>(resolve => {
      const config = { duration: ANIMATION_DURATION, easing: Easing.in(Easing.cubic) };

      opacityRef.current.value = withTiming(0, config);
      scaleRef.current.value = withTiming(0.8, config);
      translateYRef.current.value = withTiming(offset, config, finished => {
        if (finished) {
          scheduleOnRN(() => {
            isAnimatingRef.current = false;
            resolve();
          });
        }
      });
    });
  }, []);

  const showToast = useCallback(
    (position: ToastPosition, duration: number) => {
      if (isAnimatingRef.current) return Promise.resolve();

      isAnimatingRef.current = true;

      translateYRef.current.value = position === 'top' ? -DEFAULT_POSITION_OFFSET : DEFAULT_POSITION_OFFSET;
      opacityRef.current.value = 0;
      scaleRef.current.value = 0.8;
      progressWidthRef.current.value = 0;

      return new Promise<void>(resolve => {
        const config = { duration: ANIMATION_DURATION, easing: Easing.out(Easing.cubic) };

        opacityRef.current.value = withTiming(1, config);
        scaleRef.current.value = withTiming(1, config);
        translateYRef.current.value = withTiming(0, config);

        progressWidthRef.current.value = withTiming(
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
    [screenWidth],
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
