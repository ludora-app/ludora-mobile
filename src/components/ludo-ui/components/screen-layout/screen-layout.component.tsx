import { backgroundImg } from 'assets';
import { StyleSheet } from 'react-native';
import { PropsWithChildren } from 'react';
import { ImageBackground } from 'expo-image';

export default function ScreenLayout(props: PropsWithChildren) {
  const { children } = props;
  return (
    <ImageBackground source={backgroundImg} style={StyleSheet.absoluteFillObject}>
      {children}
    </ImageBackground>
  );
}
