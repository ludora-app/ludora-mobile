import { GlassViewProps } from 'expo-glass-effect';
import { StyleProp, ViewStyle } from 'react-native';
import { BlurViewProps as BlurViewRNProps } from '@sbaiahmed1/react-native-blur';

export interface BlurViewProps {
  onIos?: 'glass' | 'blur';
  onAndroid?: 'blur' | 'view';
  blurProps?: BlurViewRNProps;
  glassProps?: GlassViewProps;
  style?: StyleProp<ViewStyle>;
}
