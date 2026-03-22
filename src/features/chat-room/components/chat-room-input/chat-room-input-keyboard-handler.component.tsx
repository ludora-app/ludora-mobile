import { PropsWithChildren, useEffect } from 'react';
import { AppState, BackHandler } from 'react-native';
import { scheduleOnRN } from 'react-native-worklets';
import { useSharedValue } from 'react-native-reanimated';
import { useKeyboardHandler } from 'react-native-keyboard-controller';

import { useKeyboardStore } from '@/stores/keyboard.store';

import ChatRoomInputKeyboardEmoji from './chat-room-input-keyboard-emoji.component';
import useChatRoomInputEmojiPickerStore from '../../store/chat-room-input-emoji-picker.store';

export default function ChatRoomInputKeyboardHandler({ children }: PropsWithChildren) {
  const persistedKeyboardHeight = useKeyboardStore((state) => state.height);
  const setKeyboardHeight = useKeyboardStore((state) => state.setHeight);
  const setKeyboardVisible = useKeyboardStore((state) => state.setIsVisible);

  const isEmojiPickerOpen = useChatRoomInputEmojiPickerStore((state) => state.isEmojiPickerOpen);
  const setEmojiPickerOpen = useChatRoomInputEmojiPickerStore((state) => state.setEmojiPickerOpen);
  const heightSV = useSharedValue(0);

  useEffect(() => {
    const backAction = () => {
      if (isEmojiPickerOpen) {
        setEmojiPickerOpen(false);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [isEmojiPickerOpen, setEmojiPickerOpen]);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState !== 'active') {
        setEmojiPickerOpen(false);
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
      setEmojiPickerOpen(false);
    };
  }, [setEmojiPickerOpen]);

  useKeyboardHandler(
    {
      onEnd: (e) => {
        'worklet';

        if (e.height > 0) {
          scheduleOnRN(setKeyboardHeight, e.height);
          scheduleOnRN(setKeyboardVisible, true);
        } else {
          scheduleOnRN(setKeyboardVisible, false);
        }
      },
      onMove: (e) => {
        'worklet';

        heightSV.value = e.height;
      },
    },
    [setKeyboardHeight, setKeyboardVisible],
  );


  return (
    <ChatRoomInputKeyboardEmoji
      style={{
        height: Math.max(heightSV.value, persistedKeyboardHeight),
      }}
    >
      {children}
    </ChatRoomInputKeyboardEmoji>
  )
}
