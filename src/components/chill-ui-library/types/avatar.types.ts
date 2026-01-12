import type { VariantProps } from 'tailwind-variants';
import type { StyleProp, ViewStyle } from 'react-native';

import { ImageProps } from 'react-native';

import type { avatarTv } from '../components/avatar/styles/Avatar.styles';

import { StringProps } from './string.types';

/**
 * Props for Avatar component
 */
export interface AvatarProps {
  /** Custom CSS classes for the avatar container (NativeWind) */
  className?: string;
  /** Custom background color */
  color?: string;
  /** Avatar size variant:
   * - `'2xs'`
   * - `'xs'`
   * - `'sm'`
   * - `'md'`
   * - `'lg'`
   * - `'xl'`
   * - `'2xl'`
   */
  size?: VariantProps<typeof avatarTv>['size'];
  /** Custom inline styles */
  style?: StyleProp<ViewStyle>;
  /** Avatar shape variant:
   * - `'circle'`
   * - `'square'`
   */
  variant?: VariantProps<typeof avatarTv>['variant'];
}

export type AvatarContentProps = StringProps & {
  firstname: string;
  lastname?: string;
};

export type AvatarImageProps = ImageProps & {
  className?: string;
};
