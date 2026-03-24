import { KeyboardToolbarProps } from 'react-native-keyboard-controller';
import { WrapperKeyboardAwareScrollViewProps as WrapperKeyboardAwareScrollViewPropsChillUi } from '@chillui/ui';

export type WrapperKeyboardAwareScrollViewProps = WrapperKeyboardAwareScrollViewPropsChillUi & {
  androidSafeAreaBottom?: boolean;
  keyboardToolbarProps?: KeyboardToolbarProps;
  hasKeyboardToolbar?: boolean;
};
