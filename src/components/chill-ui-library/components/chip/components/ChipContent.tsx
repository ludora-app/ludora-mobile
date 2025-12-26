import { PropsWithChildren } from 'react';

import { Box } from '../../box';
import { cn } from '../../../utils';
import { ChipContentProps } from '../../../types/chip.types';
import { chipContentTv, twStyles } from '../styles/Chip.styles';

/**
 * ChipContent component for wrapping chip content.
 * Provides the main content container with proper layout.
 * Position is passed up to Chip via context.
 *
 * @example
 * ```tsx
 * <Button>
 *   <ButtonContent position="left">
 *     <ButtonIcon name="star" />
 *     <ButtonTitle>Favorite</ButtonTitle>
 *   </ButtonContent>
 * </Button>
 * ```
 */
export default function ChipContent({ children, className, position = 'center' }: PropsWithChildren<ChipContentProps>) {
  return <Box className={cn(chipContentTv({ position }), twStyles.content, className)}>{children}</Box>;
}

ChipContent.displayName = 'ChipContent';
