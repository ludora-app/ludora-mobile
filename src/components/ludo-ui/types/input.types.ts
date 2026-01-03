import { InputFieldProps } from '@chillui/ui';

import { IconProps } from './icon.types';

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
};
