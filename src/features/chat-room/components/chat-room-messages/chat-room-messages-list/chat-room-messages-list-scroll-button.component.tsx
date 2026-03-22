import { IconButton } from '@ludo/ui';
import { useKeyboardHandler } from 'react-native-keyboard-controller';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type ChatRoomMessagesListScrollButtonProps = {
  isVisible: boolean;
  onPress: () => void;
};

export default function ChatRoomMessagesListScrollButton({
  isVisible,
  onPress,
}: ChatRoomMessagesListScrollButtonProps) {
  const keyboardHeight = useSharedValue(0);

  useKeyboardHandler(
    {
      onEnd: (e) => {
        'worklet';

        keyboardHeight.value = e.height;
      },
      onMove: (e) => {
        'worklet';

        keyboardHeight.value = e.height;
      },
      onStart: (e) => {
        'worklet';

        keyboardHeight.value = e.height;
      },
    },
    [],
  );

  const scrollButtonStyle = useAnimatedStyle(() => ({
    bottom: 16 + keyboardHeight.value,
    opacity: withTiming(isVisible ? 1 : 0, { duration: 200 }),
    transform: [
      { translateY: withTiming(isVisible ? 0 : 20, { duration: 200 }) },
      { scale: withTiming(isVisible ? 1 : 0.8, { duration: 200 }) },
    ] as any,
  }));

  return (
    <Animated.View
      style={[
        scrollButtonStyle,
        { position: 'absolute', right: 16, zIndex: 50 },
      ]}
      pointerEvents={isVisible ? 'auto' : 'none'}
    >
      <IconButton
        iconName="arrow-down-regular"
        onPress={onPress}
        size="md"
        variant="contained"
        rounded="circle"
        className='shadow-lg'
      />
    </Animated.View>
  );
}
