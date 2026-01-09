import { ViewProps } from 'react-native';
import { VariantProps } from 'tailwind-variants';

import { StringProps } from './string.types';
import { badgeTv } from '../components/badge/styles/Badge.styles';

/**
 * Props for the Badge component
 */
export type BadgeProps = {
  /** Color variant of the badge :
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
  colorVariant?: VariantProps<typeof badgeTv>['colorVariant'];

  /** Variant of the badge :
   * - `'contained'`
   * - `'outlined'`
   */
  variant?: VariantProps<typeof badgeTv>['variant'];

  /** Size variant of the badge */
  size?: VariantProps<typeof badgeTv>['size'];

  /** Vertical position of the badge : 'top' | 'bottom' (default: 'top') */
  position?: 'top' | 'bottom';

  /** Horizontal side of the badge : 'left' | 'right' (default: 'left') */
  side?: 'left' | 'right';
};

/**
 * Props for the BadgeContent component
 */
export type BadgeContentProps = ViewProps & {
  className?: string;
};

/**
 * Props for the BadgeTitle component
 */
export type BadgeTitleProps = StringProps;
