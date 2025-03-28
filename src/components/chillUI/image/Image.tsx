import { cssInterop } from "nativewind";
import Animated from "react-native-reanimated";
import { Image as NativeImage } from "expo-image";

export const Image = NativeImage;

export const AnimatedImage = Animated.createAnimatedComponent(Image);

cssInterop(Image, {
  className: {
    target: "style", // map className->style
  },
});
