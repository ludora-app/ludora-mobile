import { withUniwind } from 'uniwind';
import Animated from 'react-native-reanimated';
import { Image as NativeImage } from 'expo-image';

export const Image = withUniwind(NativeImage);

export const AnimatedImage = Animated.createAnimatedComponent(Image);
