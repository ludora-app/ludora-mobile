import { PropsWithChildren } from 'react';

import { Box } from '../../box';
import { cn } from '../../../utils';
import { ButtonContentProps } from '../../../types/button.types';
import { buttonContentTv, twStyles } from '../styles/Button.styles';

/**
 * ButtonContent component for wrapping button content.
 * Provides the main content container with proper layout.
 * Position is passed up to Button via context.
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
export default function ButtonContent({
  children,
  className,
  position = 'center',
}: PropsWithChildren<ButtonContentProps>) {
  return <Box className={cn(buttonContentTv({ position }), twStyles.content, className)}>{children}</Box>;
}

ButtonContent.displayName = 'ButtonContent';
