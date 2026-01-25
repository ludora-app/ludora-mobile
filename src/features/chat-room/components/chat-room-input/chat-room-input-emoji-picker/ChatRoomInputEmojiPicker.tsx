import { View } from 'react-native';
import COLORS from '@constants/COLORS';
import { EmojiKeyboard, EmojiType, fr } from 'rn-emoji-keyboard';

import { useBackHandlerEmojiPicker } from '../../../hooks/useBackHandlerEmojiPicker';
import useChatRoomKeyboardHeightStore from '../../../store/chatRoomKeyboardHeightStore';
import useChatRoomInputEmojiPickerStore from '../../../store/chatRoomInputEmojiPickerStore';

export default function ChatRoomInputEmojiPicker() {
  useBackHandlerEmojiPicker();
  const { isEmojiPickerOpen, setEmojiValue } = useChatRoomInputEmojiPickerStore();
  const { keyboardHeight } = useChatRoomKeyboardHeightStore();
  const handlePick = (emoji: EmojiType) => {
    setEmojiValue(emoji.emoji);
  };

  return (
    isEmojiPickerOpen && (
      <View className="absolute bottom-0 z-50" style={{ height: keyboardHeight }}>
        <EmojiKeyboard
          onEmojiSelected={handlePick}
          translation={fr}
          theme={{
            backdrop: '#16161888',
            category: {
              container: '#252427',
              containerActive: COLORS.primaryColor,
              icon: COLORS.primaryColor,
              iconActive: '#fff',
            },
            container: '#282829',
            header: '#fff',
            knob: COLORS.primaryColor,
            skinTonesContainer: '#252427',
          }}
        />
      </View>
    )
  );
}
