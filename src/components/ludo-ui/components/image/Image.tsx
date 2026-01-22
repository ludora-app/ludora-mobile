import { withUniwind } from 'uniwind';
import { Image as NativeImage, ImageBackground as NativeImageBackground } from 'expo-image';

export const Image = withUniwind(NativeImage);

export const ImageBackground = withUniwind(NativeImageBackground);
