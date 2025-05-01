import { useMemo } from 'react';
import SportsEnum from '@/constants/SPORTS';
import { tv, VariantProps } from 'tailwind-variants';

import cn from '../../cn/cn';
import { Box } from '../../box';
import String from '../../string/components/String';

interface BadgeProps {
  className?: string;
  title: SportsEnum | string;
  size?: VariantProps<typeof String>['size'];
}

/**
 * @description Component displaying a sport tag
 * @param sport - The sport to display
 * @returns A sport tag with a background color corresponding to the sport
 */

const backgroundVariants = tv({
  base: 'bg-white',
  variants: {
    backgroundColor: {
      default: 'bg-red-500',
      [SportsEnum.BASKETBALL]: 'bg-primary',
      [SportsEnum.FOOTBALL]: 'bg-purplePrimary',
      [SportsEnum.PADDLE]: 'bg-secondary',
      [SportsEnum.TENNIS]: 'bg-bluePrimary',
      [SportsEnum.VOLLEYBALL]: 'bg-destructive',
    },
    defaultVariants: {
      backgroundColor: 'default',
    },
  },
});

export default function Badge({ className, size = 'md', title }: BadgeProps) {
  const stringVariants = useMemo(() => {
    switch (title) {
      case SportsEnum.BASKETBALL:
        return 'white';
      case SportsEnum.FOOTBALL:
        return 'white';
      case SportsEnum.PADDLE:
        return 'white';
      case SportsEnum.TENNIS:
        return 'white';
      case SportsEnum.VOLLEYBALL:
        return 'white';
      default:
        return 'dark';
    }
  }, [title]);

  return (
    <Box
      className={cn(
        'rounded-full px-3 py-1',
        className,
        backgroundVariants({ backgroundColor: title as SportsEnum | 'default' }),
      )}
    >
      <String variant={stringVariants} weight="semiBold" size={size}>
        {title}
      </String>
    </Box>
  );
}
