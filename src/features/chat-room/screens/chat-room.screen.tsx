import { chatRoomBg } from 'assets';
import { StyleSheet } from 'react-native';

import { Image } from '@/components/ludo-ui';

import ChatRoomHeader from '../components/chat-room-header/chat-room-header.component';
import ChatRoomInputWrapper from '../components/chat-room-input/chat-room-input-wrapper.component';
import ChatRoomInitializer from '../components/chat-room-initializers/chat-room-initializer.component';
import ChatRoomMessagesList from '../components/chat-room-messages/chat-room-messages-list/chat-room-messages-list.component';

export default function ChatRoom() {
  return (
    <>
      <ChatRoomInitializer />
      <Image source={chatRoomBg} style={StyleSheet.absoluteFillObject} className="opacity-70" />
      <ChatRoomHeader />
      <ChatRoomMessagesList />
      <ChatRoomInputWrapper />
    </>
  );
}
