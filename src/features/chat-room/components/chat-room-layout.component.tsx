import { chatRoomBg } from 'assets';
import { StyleSheet } from 'react-native';
import { PropsWithChildren } from 'react';

import { ImageBackground } from '@/components/ludo-ui';

export default function ChatRoomLayout(props: PropsWithChildren) {
  const { children } = props;
  return (
    <ImageBackground source={chatRoomBg} style={StyleSheet.absoluteFill}>
      {children}
    </ImageBackground>
  );
}
