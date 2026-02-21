

import { chatRoomBg } from 'assets';
import { StyleSheet } from 'react-native';

import { Image } from '@/components/ludo-ui';
import { WrapperKeyboardAvoidingView } from '@/components/chill-ui-library';

import ChatRoomInput from '../components/chat-room-input/chat-room-input.component';
import ChatRoomHeader from '../components/chat-room-header/chat-room-header.component';
import ChatRoomInitializer from '../components/chat-room-initializers/chat-room-initializer.component';
import ChatRoomMessagesList from '../components/chat-room-messages/chat-room-messages-list/chat-room-messages-list.component';

export default function ChatRoom() {
  return (
    <>
      <ChatRoomInitializer />
      <WrapperKeyboardAvoidingView fill px="none" hasSafeArea behavior="padding" edges={['top']} keyboardVerticalOffset={0}>
        <ChatRoomHeader />
        <Image source={chatRoomBg} style={StyleSheet.absoluteFillObject} className='opacity-70' />
        <ChatRoomMessagesList />
        <ChatRoomInput />
      </WrapperKeyboardAvoidingView>
    </>
  );
}
