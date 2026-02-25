import type { Ref } from 'react';
import type { Animated, TextInput } from 'react-native';

import { createContext, useContext } from 'react';

import { StringProps } from '@/components/ludo-ui/types/string.types';

import type { IconProps, InputFieldProps, InputProps } from '../../../types';

type InputIconAction = IconProps;

type InputContextValue = {
  allow: NonNullable<InputFieldProps['allow']>;
  className?: string;
  clearIconProps?: boolean;
  clickableAs?: InputFieldProps['as'];
  customRegex?: InputFieldProps['customRegex'];
  editable: boolean;
  errorClassName?: string;
  errorIconName?: string;
  errorMessage?: string;
  errorStringProps?: StringProps;
  eyeIconProps?: IconProps;
  font: NonNullable<InputFieldProps['font']>;
  hasClearIcon: boolean;
  hasError: boolean;
  hasSecureTextEntry: boolean;
  inputClassName?: string;
  isDisabled: boolean;
  isStretchable: boolean;
  label?: string;
  labelStringProps?: StringProps;
  leftIconAction?: InputIconAction;
  lengthStringProps?: StringProps;
  maxLength?: number;
  multiline?: boolean;
  onPress?: () => void;
  rightIconAction?: IconProps;
  showLength?: boolean;
  size: NonNullable<InputFieldProps['size']>;
  value?: string;
  wrapperRef?: Ref<TextInput>;

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
