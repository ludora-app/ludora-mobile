import type { PressableProps } from 'react-native';

import { IconProps } from './icon.types';

export type NumericInputProps = {
  /** Current numeric value */
  value?: number;
  /** Callback when value changes */
  onValueChange?: (value: number) => void;
  /** Minimum allowed value */
  min?: number;
  /** Maximum allowed value */
  max?: number;
  /** Step increment/decrement */
  step?: number;
  /** Size of the input: 'sm' | 'md' | 'lg' | 'xl' */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Whether the input is disabled */
  isDisabled?: boolean;
  /** Custom CSS classes */
  className?: string;
};

export type NumericInputFieldProps = {
  /** Custom CSS classes */
  className?: string;
  /** Font variant */
  font?:
    | 'primaryBold'
    | 'primaryExtraBold'
    | 'primaryExtraLight'
    | 'primaryItalic'
    | 'primaryLight'
    | 'primaryMedium'
    | 'primaryRegular'
    | 'primarySemiBold'
    | 'primaryThin'
    | 'secondaryBold'
    | 'secondaryExtraBold'
    | 'secondaryExtraLight'
    | 'secondaryItalic'
    | 'secondaryLight'
    | 'secondaryMedium'
    | 'secondaryRegular'
    | 'secondarySemiBold'
    | 'secondaryThin'
    | 'tertiaryBold'
    | 'tertiaryExtraBold'
    | 'tertiaryExtraLight'
    | 'tertiaryItalic'
    | 'tertiaryLight'
    | 'tertiaryMedium'
    | 'tertiaryRegular'
    | 'tertiarySemiBold'
    | 'tertiaryThin';
  /** Reference to the input */
  ref?: React.Ref<any>;
  /** input text content  */
  content?: string;
};

export type NumericAddInputProps = PressableProps & {
  /** Custom CSS classes */
  className?: string;
  /** Color variant of the button */
  colorVariant?:
    | 'accent'
    | 'danger'
    | 'dark'
    | 'error'
    | 'info'
    | 'inverted'
    | 'light'
    | 'muted'
    | 'neutral'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'tertiary'
    | 'warning'
    | 'white';
  /** Button style variant: 'contained' | 'outlined' */
  variant?: 'contained' | 'outlined';
  /** Icon color */
  iconColor?: IconProps['color'];
  /** Icon size */
  iconSize?: IconProps['size'];
};

export type NumericRemoveInputProps = PressableProps & {
  /** Custom CSS classes */
  className?: string;
  /** Color variant of the button */
  colorVariant?:
    | 'accent'
    | 'danger'
    | 'dark'
    | 'error'
    | 'info'
    | 'inverted'
    | 'light'
    | 'muted'
    | 'neutral'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'tertiary'
    | 'warning'
    | 'white';
  /** Button style variant: 'contained' | 'outlined' */
  variant?: 'contained' | 'outlined';
  /** Icon color */
  iconColor?: IconProps['color'];
  /** Icon size */
  iconSize?: IconProps['size'];
};
