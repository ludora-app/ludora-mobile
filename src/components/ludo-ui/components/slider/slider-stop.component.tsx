import Animated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';

import COLORS from '@/constants/colors.contstants';

import { getSliderStopLeft } from './slider.utils';

type SliderStopProps = {
  index: number;
  lastIndex: number;
  position: SharedValue<number>;
  width: SharedValue<number>;
};

export const SliderStop = (props: SliderStopProps) => {
  const { index, lastIndex, position, width } = props;

  // Filled only once the thumb actually reaches the stop, not when it becomes the closest one
  const animatedStyle = useAnimatedStyle(() => {
    const isFilled = position.get() >= (index / lastIndex) * width.get() - 0.5;
    return {
      backgroundColor: isFilled ? COLORS.primary : COLORS.white,
      borderColor: isFilled ? COLORS.primary : COLORS.input,
    };
  });

  return (
    <Animated.View
      className="absolute -ml-2.25 size-4.5 rounded-full border-[3px]"
      style={[{ left: getSliderStopLeft(index, lastIndex) }, animatedStyle]}
    />
  );
};
