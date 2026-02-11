import { ScreenLayout } from '@/components/ludo-ui';
import { WrapperKeyboardAvoidingView } from '@/components/chill-ui-library';

import ChatRoomInput from '../components/chat-room-input/chat-room-input.component';
import ChatRoomHeader from '../components/chat-room-header/chat-room-header.component';
import ChatRoomMessagesList from '../components/chat-room-messages/chat-room-messages-list/chat-room-messages-list.component';

export default function ChatRoom() {
  return (
    <ScreenLayout>
      <WrapperKeyboardAvoidingView fill px="none" hasSafeArea behavior="padding" edges={['top']}>
        <ChatRoomHeader />
        <ChatRoomMessagesList />
        <ChatRoomInput />
      </WrapperKeyboardAvoidingView>
    </ScreenLayout>
  );
}
