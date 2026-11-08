import { PropsWithChildren } from 'react';

import type { ButtonTitleProps } from '../../../types';

import { cn } from '../../../utils';
import { String } from '../../string';
import { ButtonStringTv } from '../styles/Button.styles';
import { useButtonContext } from '../context/ButtonContext';

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
export default function ButtonTitle({ children, className, ...props }: PropsWithChildren<ButtonTitleProps>) {
  const { colorVariant, isDisabled, isLoading, size, sizingVariant, variant } = useButtonContext();

  return (
    <String
      size={sizingVariant}
      className={cn(ButtonStringTv({ colorVariant, isDisabled: isDisabled && !isLoading, size, variant }), className)}
      {...props}
    >
      {children}
    </String>
  );
}

ButtonTitle.displayName = 'ButtonTitle';
