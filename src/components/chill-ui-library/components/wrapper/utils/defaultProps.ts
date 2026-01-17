import { KeyboardAvoidingViewProps } from 'react-native-keyboard-controller';

export const wrapperDefaultProps = {
  alwaysBounceVertical: false,
  behavior: 'padding' as KeyboardAvoidingViewProps['behavior'],
  bottomOffset: 20,
  fill: true,
  keyboardVerticalOffset: 10,
  showsVerticalScrollIndicator: false,
};
