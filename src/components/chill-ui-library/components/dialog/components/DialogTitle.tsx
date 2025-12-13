import type { DialogTitleProps } from '../../../types';

import { cn, isString } from '../../../utils';
import { String } from '../../string';

import { twStyles } from '../styles/Dialog.styles';

/**
 * DialogTitle component that renders a styled title section.
 * Can accept string children directly or custom React elements.
 *
 * @example
 * ```tsx
 * <DialogTitle>Confirm Action</DialogTitle>
 * ```
 *
 * @param children - Title content (string or React element)
 * @param className - (only NativeWind) Additional CSS classes for the title
 * @param style - Style object for the title container
 */
export function DialogTitle(props: DialogTitleProps) {
  const { children, className, ...rest } = props;

  return isString(children) ? (
    <String className={cn(twStyles.title, className)} size="lg" font="primarySemiBold" {...rest}>
      {children}
    </String>
  ) : (
    children
  );
}

DialogTitle.displayName = 'DialogTitle';
