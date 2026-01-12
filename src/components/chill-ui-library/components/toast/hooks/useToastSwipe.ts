import { scheduleOnRN } from 'react-native-worklets';
import { Gesture } from 'react-native-gesture-handler';
import { useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

import { UseToastSwipeOptionsProps } from '../types/toast.types';

export const useToastSwipe = ({ enabled = true, onDismiss, position, threshold = 50 }: UseToastSwipeOptionsProps) => {
  const swipeY = useSharedValue(0);
  const isDismissing = useSharedValue(false);

  const gesture = Gesture.Pan()
    .enabled(enabled)
    .onUpdate(event => {
      if (isDismissing.value) return;

      if (position === 'top' && event.translationY < 0) {
        swipeY.value = event.translationY;
      } else if (position === 'bottom' && event.translationY > 0) {
        swipeY.value = event.translationY;
      }
    })
    .onEnd(event => {
      if (isDismissing.value) return;

      const shouldDismiss =
        (position === 'top' && event.translationY < -threshold) ||
        (position === 'bottom' && event.translationY > threshold);

      if (shouldDismiss) {
        isDismissing.value = true;
        const targetY = position === 'top' ? -300 : 300;

        swipeY.value = withTiming(targetY, { duration: 200 }, finished => {
          if (finished) scheduleOnRN(onDismiss);
        });
      } else {
        swipeY.value = withSpring(0);
      }
    });

  return {
    gesture,
    swipeY,
  };
};
