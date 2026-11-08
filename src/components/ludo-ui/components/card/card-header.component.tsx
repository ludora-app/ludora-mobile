import { cn } from '@chillui/ui';

import { Box } from '../box';
import { CardSectionProps } from '../../types/card.types';

export const CardHeader = (props: CardSectionProps) => {
  const { children, className } = props;

  return <Box className={cn('gap-1', className)}>{children}</Box>;
};
