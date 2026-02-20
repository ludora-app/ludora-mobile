import { backgroundImg } from 'assets';
import { StyleSheet } from 'react-native';

import { Image, ScreenLayout } from '@/components/ludo-ui';
import { WrapperKeyboardAvoidingView } from '@/components/chill-ui-library';

import ChatRoomInitializer from '../components/chat-room-initializer.component';
import ChatRoomInput from '../components/chat-room-input/chat-room-input.component';
import ChatRoomHeader from '../components/chat-room-header/chat-room-header.component';
import ChatRoomMessagesList from '../components/chat-room-messages/chat-room-messages-list/chat-room-messages-list.component';

export default function ChatRoom() {
  return (
    <ScreenLayout>
      <ChatRoomInitializer />
      <WrapperKeyboardAvoidingView fill px="none" hasSafeArea behavior="padding" edges={['top']} keyboardVerticalOffset={0}>
        <ChatRoomHeader />
        <Image source={backgroundImg} className='absolute top-0 left-0 right-0 bottom-0 size-full z-10' style={StyleSheet.absoluteFillObject} />
        <ChatRoomMessagesList />
        <ChatRoomInput />
      </WrapperKeyboardAvoidingView>
    </ScreenLayout>
  );
}
