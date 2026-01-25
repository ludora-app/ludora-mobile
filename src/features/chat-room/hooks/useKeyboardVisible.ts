import { Keyboard } from 'react-native';
import { useEffect, useState } from 'react';

import useChatRoomKeyboardHeightStore from '../store/chatRoomKeyboardHeightStore';

export default function useKeyboardVisible(): boolean {
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
  const { keyboardHeight, setKeyboardHeight } = useChatRoomKeyboardHeightStore();

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener('keyboardDidShow', e => {
      setKeyboardIsVisible(true);
      if (keyboardHeight === e.endCoordinates.height) return;
      setKeyboardHeight(e.endCoordinates.height);
    });
    const keyboardWillHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardIsVisible(false));

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  return keyboardIsVisible;
}
