import type { VariantProps } from 'tailwind-variants';
import type { StyleProp, ViewStyle } from 'react-native';

import type { ButtonTv } from '../components/button/styles/Button.styles';

import { IconProps } from './icon.types';
import { TIconName } from '../constants';
import { StringProps } from './string.types';
import { IconConfig } from '../components/icon/context/IconContext';
import { LoadingIndicatorProps } from './loadingIndicatorsKit.types';

type TouchableComponentType = 'touchable-opacity' | 'pressable' | 'ripple-pressable' | 'scale-pressable';

/**
 * Props for the Button component (compound components API)
 */
export type ButtonProps = VariantProps<typeof ButtonTv> & {
  /** Type of touchable component to use:
   * - `'touchable-opacity'`
   * - `'pressable'`
   * - `'ripple-pressable'`
   * - `'scale-pressable'`
   */
  as?: TouchableComponentType;
  /** Custom CSS classes for the button container (NativeWind) */
  className?: string;
  /** Whether the button is disabled */
  isDisabled?: VariantProps<typeof ButtonTv>['isDisabled'];
  /** Press callback function */
  onPress?: () => void;
  /** Style object for the button container */
  style?: StyleProp<ViewStyle>;
};

export type ButtonContentProps = {
  /** Additional class names */
  className?: string;
  /** Content position: 'left' | 'center' | 'right' */
  position?: 'left' | 'center' | 'right';
};

export type ButtonIconProps<T extends IconConfig = any> = {
  /** Icon name from the icon set */
  name?: keyof T | TIconName;
  /** Icon position: 'left' | 'right' | 'inline' | 'left-outside' | 'right-outside' */
  position?: 'left' | 'right' | 'inline' | 'left-outside' | 'right-outside';
  /** Icon color */
  color?: string;
  /** Additional class names */
  className?: string;
} & Omit<IconProps, 'name'>;

export type ButtonLoaderProps = Partial<Omit<LoadingIndicatorProps, 'size'>>;

export type ButtonTitleProps = Omit<StringProps, 'children'>;
