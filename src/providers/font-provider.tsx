/* eslint-disable camelcase */
import {
  useFonts,
  NunitoSans_300Light,
  NunitoSans_400Regular,
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
  NunitoSans_900Black,
  NunitoSans_300Light_Italic,
  NunitoSans_400Regular_Italic,
  NunitoSans_600SemiBold_Italic,
  NunitoSans_700Bold_Italic,
  NunitoSans_900Black_Italic,
} from '@expo-google-fonts/nunito-sans';

type FontProviderProps = {
  children: React.ReactNode;
};

export default function FontProvider({ children }: FontProviderProps) {
  useFonts({
    NunitoSans300Light: NunitoSans_300Light,
    NunitoSans300LightItalic: NunitoSans_300Light_Italic,
    NunitoSans400Regular: NunitoSans_400Regular,
    NunitoSans400RegularItalic: NunitoSans_400Regular_Italic,
    NunitoSans600SemiBold: NunitoSans_600SemiBold,
    NunitoSans600SemiBoldItalic: NunitoSans_600SemiBold_Italic,
    NunitoSans700Bold: NunitoSans_700Bold,
    NunitoSans700BoldItalic: NunitoSans_700Bold_Italic,
    NunitoSans900Black: NunitoSans_900Black,
    NunitoSans900BlackItalic: NunitoSans_900Black_Italic,
  });

  return children;
}
