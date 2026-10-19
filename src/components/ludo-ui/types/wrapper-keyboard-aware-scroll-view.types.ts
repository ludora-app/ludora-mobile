import { KeyboardToolbarProps } from 'react-native-keyboard-controller';
import { WrapperKeyboardAwareScrollViewProps as WrapperKeyboardAwareScrollViewPropsChillUi } from '@chillui/ui';

export type WrapperKeyboardAwareScrollViewProps = WrapperKeyboardAwareScrollViewPropsChillUi & {
  keyboardToolbarProps?: KeyboardToolbarProps;
  hasKeyboardToolbar?: boolean;
};
