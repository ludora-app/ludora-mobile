import { PropsWithChildren, useEffect } from 'react';

import { Box } from '../../box';
import { cn } from '../../../utils';
import { twStyles } from '../styles/Button.styles';
import { useButtonContext } from '../context/ButtonContext';
import { ButtonContentProps } from '../../../types/button.types';

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
  const { setContentPosition } = useButtonContext();

  useEffect(() => {
    setContentPosition(position);
  }, [position, setContentPosition]);

  return <Box className={cn(twStyles.content, className)}>{children}</Box>;
}

ButtonContent.displayName = 'ButtonContent';
