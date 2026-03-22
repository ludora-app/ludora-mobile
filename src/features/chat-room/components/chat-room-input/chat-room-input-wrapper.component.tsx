import { useMemo } from 'react';
import { BlurView } from 'expo-blur';
import { KeyboardStickyView, useKeyboardHandler } from 'react-native-keyboard-controller';
import Animated, { interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import { useSafeArea } from '@/hooks/safe-area.hook';
import { IS_ANDROID, IS_IOS } from '@/constants/platform.constants';

import ChatRoomInput from './chat-room-input.component';


const ANDROID_SAFE_AREA_BOTTOM = 5;
const IOS_INPUT_BOTTOM_PADDING = 15;

const BLUR_INTENSITY = 70;

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

  const inputBottomPaddingKeyboardOpened = useMemo(() => {
    if (IS_IOS) {
      return IOS_INPUT_BOTTOM_PADDING;
    }
    return insetsBottom + (IS_ANDROID ? ANDROID_SAFE_AREA_BOTTOM : 0);
  }, [insetsBottom]);


  const animatedStyle = useAnimatedStyle(() => {
    const bottomPadding = interpolate(
      keyboardProgress.value,
      [0, 1],
      [insetsBottom + (IS_ANDROID ? ANDROID_SAFE_AREA_BOTTOM : 0), inputBottomPaddingKeyboardOpened],
      'clamp',
    );

    return {
      paddingBottom: bottomPadding,
    };
  });


  return (
    <KeyboardStickyView>
      <BlurView
        intensity={BLUR_INTENSITY}
        experimentalBlurMethod="dimezisBlurView"
      >
        <Animated.View
          style={animatedStyle}
          className="flex-row items-center gap-2 pt-2 px-4 relative z-50"
        >
          <ChatRoomInput />
        </Animated.View>
      </BlurView>
    </KeyboardStickyView>
  );
}
