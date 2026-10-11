import * as SplashScreen from 'expo-splash-screen';
import { PropsWithChildren, useEffect } from 'react';
import {
  Baloo2_500Medium as Baloo2500Medium,
  Baloo2_700Bold as Baloo2700Bold,
  Baloo2_400Regular as Baloo2400Regular,
  Baloo2_600SemiBold as Baloo2600SemiBold,
  Baloo2_800ExtraBold as Baloo2800ExtraBold,
} from '@expo-google-fonts/baloo-2';
import {
  useFonts,
  Figtree_300Light as Figtree300Light,
  Figtree_700Bold as Figtree700Bold,
  Figtree_500Medium as Figtree500Medium,
  Figtree_400Regular as Figtree400Regular,
  Figtree_600SemiBold as Figtree600SemiBold,
  Figtree_800ExtraBold as Figtree800ExtraBold,
  Figtree_500Medium_Italic as Figtree500MediumItalic,
  Figtree_400Regular_Italic as Figtree400RegularItalic,
} from '@expo-google-fonts/figtree';

export default function FontProvider({ children }: PropsWithChildren) {
  // Figtree is the UI font (primary), Baloo 2 the title font (secondary)
  const [fontsLoaded] = useFonts({
    Baloo2400Regular,
    Baloo2500Medium,
    Baloo2600SemiBold,
    Baloo2700Bold,
    Baloo2800ExtraBold,
    Figtree300Light,
    Figtree400Regular,
    Figtree400RegularItalic,
    Figtree500Medium,
    Figtree500MediumItalic,
    Figtree600SemiBold,
    Figtree700Bold,
    Figtree800ExtraBold,
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
