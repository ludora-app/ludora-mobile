import React from 'react';
import { String } from '@chillUI';
import { headerImage } from 'assets';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground } from 'expo-image';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import HeaderHome from './Header.home';

export default function Header() {
  const { top } = useSafeAreaInsets();
  // console.log('top', top);

  return (
    <ImageBackground source={headerImage} className="w-full rounded-b-3xl">
      <SafeAreaView edges={['top']}>
        <StatusBar hidden />
        <String variant="white" weight="bold" size="xl">
          Bonjour, Thomas{' '}
        </String>
        <String variant="white" weight="semiBold" size="sm">
          Prêt à trouver une session sportive aujourd’hui ?
        </String>
        <HeaderHome />
      </SafeAreaView>
    </ImageBackground>
  );
}
