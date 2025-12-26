import React, { useEffect, useCallback, useImperativeHandle, forwardRef, PropsWithChildren } from 'react';
import {
  createAnimatedComponent,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withRepeat,
  withDelay,
  cancelAnimation,
} from 'react-native-reanimated';

import type { BounceBoxProps, BounceBoxRef } from '../../../../types';

import { Box } from '../../../box/components/Box';

const AnimatedBox = createAnimatedComponent(Box);

const BounceBox = forwardRef<BounceBoxRef, PropsWithChildren<BounceBoxProps>>((props, ref) => {
  const {
    autoStart = false,
    bounceHeight = 20,
    bounceInterval = 2000,
    children,
    className,
    duration = 400,
    infiniteLoop = false,
    onBounce,
    style,
    ...rest
  } = props;

  const translateY = useSharedValue(0);

  const triggerSingleBounce = useCallback(() => {
    translateY.value = withSequence(
      withTiming(-bounceHeight, { duration: duration / 2 }),
      withTiming(0, { duration: duration / 2 }, finished => {
        if (finished && onBounce) {
          onBounce();
        }
      }),
    );
  }, [bounceHeight, duration, onBounce]);

  const startAnimation = useCallback(() => {
    if (infiniteLoop) {
      // 2. Boucle infinie gérée nativement avec un délai (bounceInterval)
      // On crée une séquence : Rebond -> Retour -> Attente
      translateY.value = withRepeat(
        withSequence(
          withTiming(-bounceHeight, { duration: duration / 2 }),
          withTiming(0, { duration: duration / 2 }),
          withDelay(bounceInterval - duration, withTiming(0, { duration: 0 })),
        ),
        -1, // -1 signifie infini
        false, // ne pas inverser (on veut recommencer la séquence à chaque fois)
      );
    } else {
      triggerSingleBounce();
    }
  }, [infiniteLoop, bounceHeight, duration, bounceInterval, triggerSingleBounce]);

  const stopAnimation = useCallback(() => {
    cancelAnimation(translateY);
    translateY.value = withTiming(0);
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      bounce: triggerSingleBounce,
      start: startAnimation,
      stop: stopAnimation,
    }),
    [triggerSingleBounce, startAnimation, stopAnimation],
  );

  useEffect(() => {
    if (autoStart) {
      startAnimation();
    }
    return () => stopAnimation();
  }, [autoStart, startAnimation, stopAnimation]);

  // 3. Style animé calculé sur le thread UI
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <AnimatedBox className={className} style={[animatedStyle, style]} {...rest}>
      {children}
    </AnimatedBox>
  );
});

BounceBox.displayName = 'BounceBox';
export default BounceBox;
