import { cn } from '../../../utils';
import { useEffect } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { SegmentedControlIndicatorProps } from '../../../types';

import { twStyles } from '../styles/SegmentedControl.styles';
import { segmentedControlDefaultProps } from '../utils/defaultProps';
import { useSegmentedControlState } from '../context/SegmentedControlContext';

/**
 * Animated visual indicator for the selected option.
 *
 * @example
 * ```tsx
 * <SegmentedControlIndicator />
 * ```
 *
 * @param className - Custom CSS classes for styling the indicator (NativeWind)
 * @param duration - Animation duration in milliseconds for position transitions (default: 200)
 * @param style - Style object for the indicator (React Native)
 * @returns SegmentedControlIndicator component with animated positioning
 * @throws Error if used outside of SegmentedControlProvider context
 */
export function SegmentedControlIndicator(props: SegmentedControlIndicatorProps) {
  const { itemWidth, selectedOption, validItemsValues } = useSegmentedControlState();
  const { className, duration, style } = props;

  const animatedLeft = useSharedValue(
    itemWidth * validItemsValues.indexOf(selectedOption) + segmentedControlDefaultProps.internalPadding / 2,
  );

  useEffect(() => {
    const newLeft =
      itemWidth * validItemsValues.indexOf(selectedOption) + segmentedControlDefaultProps.internalPadding / 2;
    animatedLeft.value = withTiming(newLeft, {
      duration: duration ?? segmentedControlDefaultProps.duration,
    });
  }, [selectedOption, validItemsValues, itemWidth, duration]);

  const animatedStyle = useAnimatedStyle(() => ({
    left: animatedLeft.value,
    width: itemWidth,
  }));

  return (
    <Animated.View
      className={cn(twStyles.indicatorContainer, className, twStyles.indicatorContainerFreezed)}
      style={[animatedStyle, style]}
    />
  );
}

SegmentedControlIndicator.displayName = 'SegmentedControlIndicator';
