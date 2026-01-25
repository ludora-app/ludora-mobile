import { useEffect } from 'react';
import { BackHandler } from 'react-native';

import useChatRoomInputEmojiPickerStore from '../store/chatRoomInputEmojiPickerStore';

export function useBackHandlerEmojiPicker() {
  const { isEmojiPickerOpen, setEmojiPickerOpen } = useChatRoomInputEmojiPickerStore();

  useEffect(() => {
    const onBackPress = () => {
      if (isEmojiPickerOpen) {
        setEmojiPickerOpen(false);
        return true;
      }
      return false;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => subscription.remove();
  }, [isEmojiPickerOpen, setEmojiPickerOpen]);
}
