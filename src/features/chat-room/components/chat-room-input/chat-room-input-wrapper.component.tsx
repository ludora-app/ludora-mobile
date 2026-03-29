import { useKeyboardHandler } from 'react-native-keyboard-controller';
import Animated, { interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import { useSafeArea } from '@/hooks/safe-area.hook';
import { IS_ANDROID } from '@/constants/platform.constants';

import ChatRoomInput from './chat-room-input.component';

const ANDROID_SAFE_AREA_BOTTOM = 5;
const INPUT_BOTTOM_PADDING_WHEN_KEYBOARD_IS_OPEN = 15;

export default function ChatRoomInputWrapper() {
  const { insetsBottom } = useSafeArea();
  const keyboardProgress = useSharedValue(0);

  useKeyboardHandler(
    {
      onEnd: e => {
        'worklet';

        keyboardProgress.value = e.progress;
      },
      onMove: e => {
        'worklet';

        keyboardProgress.value = e.progress;
      },
      onStart: e => {
        'worklet';

        keyboardProgress.value = e.progress;
      },
    },
    [],
  );

  const animatedStyle = useAnimatedStyle(() => {
    const bottomPadding = interpolate(
      keyboardProgress.value,
      [0, 1],
      [insetsBottom + (IS_ANDROID ? ANDROID_SAFE_AREA_BOTTOM : 0), INPUT_BOTTOM_PADDING_WHEN_KEYBOARD_IS_OPEN],
      'clamp',
    );

    return {
      paddingBottom: bottomPadding,
    };
  });

  return (
    <Animated.View style={animatedStyle} className="relative z-50 flex-row items-center gap-2 px-4 pt-2">
      <ChatRoomInput />
    </Animated.View>
  );
}
