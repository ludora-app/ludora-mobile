import { useCallback, useRef } from 'react';
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const SCROLL_THRESHOLD = 2;
const TOP_THRESHOLD = 20;
const ANIMATION_DURATION = 200;

export function useFabScrollHide() {
  const lastScrollY = useRef(0);
  const fabScale = useSharedValue(1);

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentY = e.nativeEvent.contentOffset.y;
      const delta = currentY - lastScrollY.current;

      if (currentY <= TOP_THRESHOLD) {
        fabScale.value = withTiming(1, { duration: ANIMATION_DURATION });
      } else if (delta > SCROLL_THRESHOLD) {
        fabScale.value = withTiming(0, { duration: ANIMATION_DURATION });
      } else if (delta < -SCROLL_THRESHOLD) {
        fabScale.value = withTiming(1, { duration: ANIMATION_DURATION });
      }

      lastScrollY.current = currentY;
    },
    [fabScale],
  );

  const fabAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: fabScale.value }],
  }));

  return { fabAnimatedStyle, handleScroll };
}
