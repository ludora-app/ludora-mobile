import { Wrapper } from '@ludo/ui';

import ChatRoomHeader from '../components/chat-room-header/chat-room-header.component';
import ChatRoomMessage from '../components/chat-room-messages/chat-room-message.component';
import ChatRoomInputContainer from '../components/chat-room-input/chat-room-input-container.component';
import ChatRoomInputKeyboardEmojiView from '../components/chat-room-input/chat-room-input-keyboard-emoji-view.component';
import ChatRoomInputEmojiPicker from '../components/chat-room-input/chat-room-input-emoji-picker/ChatRoomInputEmojiPicker';
import ChatRoomMessageFullScreenImageModal from '../components/chat-room-messages/chat-room-messages-content/ChatRoomMessageFullScreenImageModal';

export default function ChatRoom() {
  return (
    <Wrapper px="none">
      <ChatRoomHeader />
      <ChatRoomMessage />
      <ChatRoomInputContainer />
      <ChatRoomInputEmojiPicker />
      <ChatRoomInputKeyboardEmojiView />
      <ChatRoomMessageFullScreenImageModal />
    </Wrapper>
  );
}
