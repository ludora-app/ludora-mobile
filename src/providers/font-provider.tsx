import * as SplashScreen from 'expo-splash-screen';
import { PropsWithChildren, useEffect } from 'react';
import {
  useFonts,
  NunitoSans_300Light as NunitoSans300Light,
  NunitoSans_400Regular as NunitoSans400Regular,
  NunitoSans_600SemiBold as NunitoSans600SemiBold,
  NunitoSans_700Bold as NunitoSans700Bold,
  NunitoSans_900Black as NunitoSans900Black,
  NunitoSans_300Light_Italic as NunitoSans300LightItalic,
  NunitoSans_400Regular_Italic as NunitoSans400RegularItalic,
  NunitoSans_600SemiBold_Italic as NunitoSans600SemiBoldItalic,
  NunitoSans_700Bold_Italic as NunitoSans700BoldItalic,
  NunitoSans_900Black_Italic as NunitoSans900BlackItalic,
  NunitoSans_800ExtraBold as NunitoSans800ExtraBold,
} from '@expo-google-fonts/nunito-sans';

export default function FontProvider({ children }: PropsWithChildren) {
  const [fontsLoaded] = useFonts({
    NunitoSans300Light,
    NunitoSans300LightItalic,
    NunitoSans400Regular,
    NunitoSans400RegularItalic,
    NunitoSans600SemiBold,
    NunitoSans600SemiBoldItalic,
    NunitoSans700Bold,
    NunitoSans700BoldItalic,
    NunitoSans800ExtraBold,
    NunitoSans900Black,
    NunitoSans900BlackItalic,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return children;
}
