import { PropsWithChildren } from 'react';

import { ChipTitleProps } from '@/components/chill-ui-library/types';

import { cn } from '../../../utils';
import { String } from '../../string';
import { ChipStringTv } from '../styles/Chip.styles';
import { useChipContext } from '../context/ChipContext';

/**
 * ButtonTitle component for rendering text within a Button.
 * Automatically inherits styling from Button context.
 *
 * @example
 * ```tsx
 * <Button>
 *   <ButtonTitle>Click me</ButtonTitle>
 * </Button>
 * ```
 */
export default function ChipTitle({ children, className, ...props }: PropsWithChildren<ChipTitleProps>) {
  const { colorVariant, sizingVariant, variant } = useChipContext();

  return (
    <String size={sizingVariant} className={cn(ChipStringTv({ colorVariant, variant }), className)} {...props}>
      {children}
    </String>
  );
}

ChipTitle.displayName = 'ChipTitle';
