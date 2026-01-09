import React, { useMemo, PropsWithChildren } from 'react';

import { Box } from '../../box';
import { BadgeContext } from '../context/BadgeContext';
import { BadgeProps } from '../../../types/badge.types';
import { badgeDefaultProps } from '../utils/defaultProps';

/**
 * The `<Badge />` component provides a flexible and accessible badge implementation.
 * Supports multiple color variants, sizes, and shapes using NativeWind.
 * Works with BadgeTitle and BadgeContent as child components.
 *
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { Badge, BadgeTitle, BadgeContent } from '@chillui/ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * // Standalone badge
 * <Badge colorVariant="primary">
 *   <BadgeTitle>New</BadgeTitle>
 * </Badge>
 *
 * // Badge with wrapped element
 * <Badge colorVariant="error">
 * <BadgeContent>
 *   <BadgeTitle>5</BadgeTitle>
 * </BadgeContent>
 * <Icon name="bell" />
 * </Badge>
 * ```
 *
 * @param colorVariant - Badge color variant: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'accent' | 'dark' | 'light' | 'danger' | 'neutral' | 'muted' | 'tertiary' | 'inverted' | 'white' (default: 'primary')
 * @param rounded - Badge shape: 'circle' | 'square' (default: 'square')
 * @param size - Badge size variant: 'xs' | 'sm' | 'md' | 'lg' (default: 'md')
 * @param variant - Badge style variant: 'contained' | 'outlined' (default: 'contained')
 * @param children - Badge children (BadgeTitle and/or BadgeContent)
 */
export default function Badge(props: PropsWithChildren<BadgeProps>) {
  const {
    children,
    colorVariant = badgeDefaultProps.colorVariant,
    position = 'top',
    side = 'left',
    size = badgeDefaultProps.size,
    variant = badgeDefaultProps.variant,
  } = props;

  const contextValue = useMemo(
    () => ({
      colorVariant,
      position,
      side,
      size,
      variant,
    }),
    [colorVariant, position, side, size, variant],
  );

  return (
    <BadgeContext.Provider value={contextValue}>
      <Box className="relative">{children}</Box>
    </BadgeContext.Provider>
  );
}
