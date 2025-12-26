import type { VariantProps } from 'tailwind-variants';
import type { StyleProp, ViewStyle } from 'react-native';

import type { chipTv } from '../components/chip/styles/Chip.styles';

import { IconProps } from './icon.types';
import { TIconName } from '../constants';
import { StringProps } from './string.types';
import { IconConfig } from '../components/icon/context/IconContext';
import { LoadingIndicatorProps } from './loadingIndicatorsKit.types';

type TouchableComponentType = 'touchable-opacity' | 'pressable' | 'ripple-pressable' | 'scale-pressable';

/**
 * Props for the Button component (compound components API)
 */
export type ChipProps = VariantProps<typeof chipTv> & {
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
  isDisabled?: VariantProps<typeof chipTv>['isDisabled'];
  /** Press callback function */
  onPress?: () => void;
  /** Style object for the button container */
  style?: StyleProp<ViewStyle>;
};

export type ChipContentProps = {
  /** Additional class names */
  className?: string;
  /** Content position: 'left' | 'center' | 'right' */
  position?: 'left' | 'center' | 'right';
};

export type ChipIconProps<T extends IconConfig = any> = {
  /** Icon name from the icon set */
  name?: keyof T | TIconName;
  /** Icon position: 'left' | 'right' | 'inline' */
  position?: 'left' | 'right' | 'inline';
  /** Icon color */
  color?: string;
  /** Additional class names */
  className?: string;
} & Omit<IconProps, 'name'>;

export type ChipLoaderProps = Partial<Omit<LoadingIndicatorProps, 'size'>>;

export type ChipTitleProps = Omit<StringProps, 'children'>;
