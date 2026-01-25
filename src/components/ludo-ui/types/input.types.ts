import { InputFieldProps } from '@chillui/ui';

import { IconProps } from './icon.types';
import { StringProps } from './string.types';

export type InputProps = {
  label?: string;
  error?: string;
  leftIconAction?: IconProps;
  rightIconAction?: IconProps;
  inputFieldProps?: InputFieldProps;
  className?: string;
  inputContainerClassName?: string;
  hasError?: boolean;
  hasMessageError?: boolean;
  hasClearIcon?: boolean;
  rightContentProps?: StringProps & {
    content: string;
  };
  hasLengthCounter?: boolean;
};
