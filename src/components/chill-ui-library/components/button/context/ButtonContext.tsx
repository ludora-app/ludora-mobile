import { createContext, useContext } from 'react';

import type { ButtonProps } from '../../../types';

export type ButtonContextValue = {
  colorVariant: ButtonProps['colorVariant'];
  isDisabled: boolean;
  size: ButtonProps['size'];
  sizingVariant: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  variant: ButtonProps['variant'];
  fit: boolean;
};

export const ButtonContext = createContext<ButtonContextValue | null>(null);

export function useButtonContext() {
  const context = useContext(ButtonContext);

  if (!context) {
    throw new Error('Button compound components must be used within a Button component');
  }

  return context;
}
