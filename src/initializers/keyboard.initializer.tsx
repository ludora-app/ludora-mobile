import { scheduleOnRN } from 'react-native-worklets';
import { useKeyboardHandler } from 'react-native-keyboard-controller';

import { useKeyboardStore } from '@/stores/keyboard.store';

export default function KeyboardInitializer() {
  const setKeyboardHeight = useKeyboardStore((state) => state.setHeight);

  useKeyboardHandler({
    onEnd: (e) => {
      'worklet';

      if (e.height > 0) {
        scheduleOnRN(setKeyboardHeight, e.height);
      }
    },
  }, [setKeyboardHeight]);

  return null;
}
