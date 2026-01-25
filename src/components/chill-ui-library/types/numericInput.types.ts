import type { PressableProps } from 'react-native';

import { VariantProps } from 'tailwind-variants';

import { IconProps } from './icon.types';
import { numericInputButtonTv } from '../components/numericInput/styles/NumericInput.styles';

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
  colorVariant?: VariantProps<typeof numericInputButtonTv>['color'];
  /** Button style variant: 'contained' | 'outlined' */
  variant?: VariantProps<typeof numericInputButtonTv>['variant'];
  /** Icon color */
  iconColor?: IconProps['color'];
  /** Icon size */
  iconSize?: IconProps['size'];
  /** Component to render */
  as?: 'pressable' | 'scalePressable';
};

export type NumericRemoveInputProps = PressableProps & {
  /** Custom CSS classes */
  className?: string;
  /** Color variant of the button */
  colorVariant?: VariantProps<typeof numericInputButtonTv>['color'];
  /** Button style variant: 'contained' | 'outlined' */
  variant?: VariantProps<typeof numericInputButtonTv>['variant'];
  /** Icon color */
  iconColor?: IconProps['color'];
  /** Icon size */
  iconSize?: IconProps['size'];
  /** Component to render */
  as?: 'pressable' | 'scalePressable';
};
