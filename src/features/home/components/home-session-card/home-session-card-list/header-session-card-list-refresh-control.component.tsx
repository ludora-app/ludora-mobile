import React, { useEffect } from 'react';
import { Box, Icon, ReanimatedBox } from '@ludo/ui';
import { StyleSheet, ViewStyle } from 'react-native';
import {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';

import COLORS from '@/constants/COLORS';

const styles = StyleSheet.create({
  sheetHeaderContainer: {
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { height: -2, width: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  spinnerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: -45,
    zIndex: 10,
  },
});

interface HeaderSessionCardListRefreshControlProps {
  isFetching: boolean;
  scrollY: SharedValue<number>;
}

export default function HeaderSessionCardListRefreshControl({
  isFetching,
  scrollY,
}: HeaderSessionCardListRefreshControlProps) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (isFetching) {
      const startRotation = interpolate(scrollY.value, [0, -60], [0, -360], Extrapolation.CLAMP);
      rotation.value = startRotation;

      rotation.value = withRepeat(
        withTiming(startRotation - 360, { duration: 1000, easing: Easing.linear }),
        -1,
        false,
      );
    } else {
      cancelAnimation(rotation);
      rotation.value = 0;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  const rSpinnerStyle = useAnimatedStyle(() => {
    if (isFetching) {
      return { opacity: 1, transform: [{ scale: 1 }, { translateY: 0 }] };
    }

    const opacity = interpolate(scrollY.value, [-5, -60], [0, 1], Extrapolation.CLAMP);
    const scale = interpolate(scrollY.value, [-5, -60], [0.5, 1], Extrapolation.CLAMP);
    const translateY = interpolate(scrollY.value, [0, -60], [10, 0], Extrapolation.CLAMP);

    return {
      opacity,
      transform: [{ scale }, { translateY }],
    } as ViewStyle;
  });

  const iconSpinStyle = useAnimatedStyle(() => {
    const scrollRotate = interpolate(scrollY.value, [0, -60], [0, -360], Extrapolation.EXTEND);

    const finalRotation = isFetching ? rotation.value : scrollRotate;

    return {
      transform: [{ rotate: `${finalRotation}deg` }],
    };
  });

  return (
    <ReanimatedBox style={[styles.spinnerContainer, rSpinnerStyle]}>
      <Box className="rounded-full bg-white p-2 shadow-sm">
        <ReanimatedBox style={iconSpinStyle}>
          <Icon name="rotate-left-regular" color={COLORS.primary} />
        </ReanimatedBox>
      </Box>
    </ReanimatedBox>
  );
}
