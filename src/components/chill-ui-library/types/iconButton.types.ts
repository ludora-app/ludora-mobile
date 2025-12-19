import { VariantProps } from 'tailwind-variants';
import { ViewStyle, StyleProp } from 'react-native';

import { IconProps } from './icon.types';
import { TIconName, TIcons } from '../constants';
import { IconConfig } from '../components/icon/context/IconContext';
import { LoadingIndicatorProps } from './loadingIndicatorsKit.types';
import { iconButtonTv } from '../components/iconButton/styles/IconButton.styles';

type ButtonIconTouchableComponentType = 'touchable-opacity' | 'pressable' | 'ripple-pressable' | 'scale-pressable';

/**
 * Props for the iconButton component
 */
export type IconButtonProps<T extends IconConfig = TIcons> = {
  /** Custom CSS classes for the button container */
  className?: string;
  /** Color of the icon */
  iconColor?: string;

  /** Color variant of the button :
   * - `'primary'`
   * - `'secondary'`
   * - `'error'`
   * - `'warning'`
   * - `'success'`
   * - `'accent'`
   * - `'dark'`
   * - `'light'`
   * - `'danger'`
   * - `'neutral'`
   * - `'muted'`
   * - `'tertiary'`
   * - `'inverted'`
   * - `'white'`
   */
  colorVariant?: VariantProps<typeof iconButtonTv>['colorVariant'];
  /** Press callback function */
  onPress?: () => void;
  /** Icon name from the available icon set */
  iconName: keyof T | TIconName;
  /** Icon size variant */
  size?: IconProps['size'];
  /** Props to pass to the loading indicator */
  loadingIndicatorProps?: LoadingIndicatorProps;
  /** Type of touchable component to use */
  as?: ButtonIconTouchableComponentType;
  /** Style object for the button container */
  style?: StyleProp<ViewStyle>;

  /** Variant of the button :
   * - `'contained'`
   * - `'outlined'`
   */
  variant?: VariantProps<typeof iconButtonTv>['variant'];

  /** Whether the button is disabled */
  isDisabled?: boolean;

  /** Whether the button is loading */
  isLoading?: boolean;

  /** Shape of the button :
   * - `'circle'`
   * - `'square'`
   */
  rounded?: VariantProps<typeof iconButtonTv>['rounded'];
};
