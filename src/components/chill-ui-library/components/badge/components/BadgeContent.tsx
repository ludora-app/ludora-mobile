import { PropsWithChildren } from 'react';

import { Box } from '../../box';
import { cn } from '../../../utils';
import { useBadgeContext } from '../context/BadgeContext';
import { badgeTv, twStyles } from '../styles/Badge.styles';
import { BadgeContentProps } from '../../../types/badge.types';

/**
 * BadgeContent component for wrapping the badge title.
 * Applies the badge styling (badgeTv) and provides absolute positioning.
 *
 * @example
 * ```tsx
 * <Badge colorVariant="error" position="top" side="right">
 *   <BadgeContent>
 *     <BadgeTitle>5</BadgeTitle>
 *   </BadgeContent>
 *   <Icon name="bell" />
 * </Badge>
 * ```
 */
export default function BadgeContent(props: PropsWithChildren<BadgeContentProps>) {
  const { children, className } = props;
  const { colorVariant, position, side, size, variant } = useBadgeContext();

  return (
    <Box className={cn(badgeTv({ colorVariant, position, side, size, variant }), twStyles.badgeContent, className)}>
      {children}
    </Box>
  );
}

BadgeContent.displayName = 'BadgeContent';
