import { Box } from '@components/nysaUi';

import useKeyboardVisible from '../../hooks/useKeyboardVisible';
import useChatRoomKeyboardHeightStore from '../../store/chatRoomKeyboardHeightStore';
import useChatRoomInputEmojiPickerStore from '../../store/chatRoomInputEmojiPickerStore';

export default function ChatRoomInputKeyboardEmojiView() {
  const { keyboardHeight } = useChatRoomKeyboardHeightStore();
  const isKeyboardVisible = useKeyboardVisible();
  const { isEmojiPickerOpen } = useChatRoomInputEmojiPickerStore();
  return (
    <Box
      style={{
        height: isEmojiPickerOpen || isKeyboardVisible ? keyboardHeight : 0,
      }}
      className="mt-4"
    />
  );
}
