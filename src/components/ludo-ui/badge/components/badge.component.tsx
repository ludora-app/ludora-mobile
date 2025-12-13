import { useMemo } from 'react';

import { cn, Box, String } from '@chillui/ui';
import { BadgeProps } from '../../utils/types';
import backgroundVariants from '../utils/styleVariants';

/**
 * @description Component displaying a sport tag
 * @param sport - The sport to display
 * @returns A sport tag with a background color corresponding to the sport
 */

export default function Badge({ className, size = 'md', title, variant = 'default' }: BadgeProps) {
  const stringVariants = useMemo(() => {
    switch (variant) {
      case 'primary':
        return 'white';
      case 'purplePrimary':
        return 'white';
      case 'secondary':
        return 'white';
      case 'destructive':
        return 'white';
      case 'white':
        return 'dark';
      default:
        return 'white';
    }
  }, [variant]);

  return (
    <Box className={cn('rounded-full px-3 py-1', className, backgroundVariants({ variant }))}>
      <String variant={stringVariants} weight="semiBold" size={size}>
        {title}
      </String>
    </Box>
  );
}
