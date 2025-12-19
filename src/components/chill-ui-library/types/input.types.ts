import type { TextInput, TextInputProps, ViewProps } from 'react-native';

import { TIconName } from '../constants';
import { IconProps } from './icon.types';
import { StringProps } from './string.types';
import { IconConfig } from '../components/icon/context/IconContext';

export type InputProps = ViewProps;

export type InputContainerProps = ViewProps;

export type InputFieldProps = TextInputProps & {
  ref?: React.Ref<TextInput>;
  className?: string;
  font?: StringProps['font'];
  allow?: 'all' | 'numbers' | 'letters' | 'lettersWithoutSpecialCharacters';
  customRegex?: RegExp;
  value?: string;
  onChangeText?: (text: string) => void;
  size?: 'xl' | 'lg' | 'md' | 'sm';
};

export type InputLabelProps = StringProps & {
  title?: string;
};

export type InputIconProps<T extends IconConfig> = Partial<IconProps<T>> & {
  className?: string;
  name?: keyof T | TIconName;
};

export type InputMessageProps = StringProps & {
  title?: string;
};
