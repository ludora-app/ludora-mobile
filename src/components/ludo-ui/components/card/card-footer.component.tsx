import { cn } from '@chillui/ui';

import { BoxRow } from '../box';
import { CardSectionProps } from '../../types/card.types';

export const CardFooter = (props: CardSectionProps) => {
  const { children, className } = props;

  return <BoxRow className={cn('items-center gap-2', className)}>{children}</BoxRow>;
};
