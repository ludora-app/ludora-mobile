import { PropsWithChildren } from 'react';

import { Box } from '../../box';
import { cn } from '../../../utils';
import { buttonDefaultProps } from '../utils/defaultProps';
import { useButtonContext } from '../context/ButtonContext';
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
  position = buttonDefaultProps.position,
}: PropsWithChildren<ButtonContentProps>) {
  const { fit } = useButtonContext();
  return <Box className={cn(buttonContentTv({ fit, position }), twStyles.content, className)}>{children}</Box>;
}

ButtonContent.displayName = 'ButtonContent';
