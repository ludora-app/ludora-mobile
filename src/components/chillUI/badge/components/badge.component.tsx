import { tv } from 'tailwind-variants';
import SportsEnum from '@/constants/SPORTS';

import cn from '../../cn/cn';
import { Box } from '../../box';
import String from '../../string/components/String';

interface BadgeProps {
  title: SportsEnum;
  className?: string;
}

/**
 * @description Component displaying a sport tag
 * @param sport - The sport to display
 * @returns A sport tag with a background color corresponding to the sport
 */

const backgroundVariants = tv({
  variants: {
    backgroundColor: {
      default: 'bg-ring',
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

export default function Badge({ className, title }: BadgeProps) {
  return (
    <Box className={cn('rounded-full px-2 py-1', className, backgroundVariants({ backgroundColor: title }))}>
      <String variant="white" weight="semiBold" size="xs">
        {title}
      </String>
    </Box>
  );
}
