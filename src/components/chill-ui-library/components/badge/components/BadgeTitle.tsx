import { PropsWithChildren } from 'react';

import type { BadgeTitleProps } from '../../../types/badge.types';

import { cn } from '../../../utils';
import { String } from '../../string';
import { BadgeStringTv } from '../styles/Badge.styles';
import { useBadgeContext } from '../context/BadgeContext';

/**
 * BadgeTitle component for rendering text within a Badge.
 * Automatically inherits styling from Badge context.
 *
 * @example
 * ```tsx
 * <Badge colorVariant="error">
 *   <BadgeContent>
 *     <BadgeTitle>5</BadgeTitle>
 *   </BadgeContent>
 *   <Icon name="bell" />
 * </Badge>
 * ```
 */
export default function BadgeTitle(props: PropsWithChildren<BadgeTitleProps>) {
  const { children, className, ...rest } = props;
  const { colorVariant, size, variant } = useBadgeContext();

  return (
    <String className={cn(BadgeStringTv({ colorVariant, size, variant }), className)} {...rest}>
      {children}
    </String>
  );
}

BadgeTitle.displayName = 'BadgeTitle';
