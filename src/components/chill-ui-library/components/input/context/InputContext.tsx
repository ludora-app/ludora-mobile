import type { Ref } from 'react';
import type { Animated, TextInput } from 'react-native';

import { createContext, useContext } from 'react';

import type { IconProps, InputProps } from '../../../types';

type InputIconAction = InputProps['leftIconAction'];

type InputContextValue = {
  allow: NonNullable<InputProps['allow']>;
  className?: string;
  clearIconProps?: InputProps['clearIconProps'];
  clickableAs?: InputProps['clickableAs'];
  customRegex?: InputProps['customRegex'];
  editable: boolean;
  errorClassName?: string;
  errorIconName?: InputProps['errorIconName'];
  errorMessage?: string;
  errorStringProps?: InputProps['errorStringProps'];
  eyeIconProps?: InputProps['eyeIconProps'];
  font: NonNullable<InputProps['font']>;
  hasClearIcon: boolean;
  hasError: boolean;
  hasSecureTextEntry: boolean;
  inputClassName?: string;
  isDisabled: boolean;
  isStretchable: boolean;
  label?: string;
  labelStringProps?: InputProps['labelStringProps'];
  leftIconAction?: InputIconAction;
  lengthStringProps?: InputProps['lengthStringProps'];
  maxLength?: number;
  multiline?: boolean;
  onPress?: InputProps['onPress'];
  rightIconAction?: InputProps['rightIconAction'];
  showLength?: boolean;
  size: NonNullable<InputProps['size']>;
  value?: string;
  wrapperRef?: InputProps['wrapperRef'];

  inputValue: string;
  isSecureEntry: boolean;
  scaleAnim: Animated.Value;
  xmarkIconSize: IconProps['size'];

  setIsSecureEntry: (next: boolean) => void;
  handleClearInput: () => void;
  handleOnChange: (text: string) => void;
  handlePressIn: () => void;
  handlePressOut: () => void;

  inputRef?: Ref<TextInput>;
  restTextInputProps: Omit<InputProps, 'value' | 'onChangeText'>;
};

export const InputContext = createContext<InputContextValue | null>(null);

export function useInputContext() {
  const context = useContext(InputContext);

  if (!context) {
    throw new Error('Input compound components must be used within an Input component');
  }

  return context;
}

export function useOptionalInputContext() {
  return useContext(InputContext);
}
