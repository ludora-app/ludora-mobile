import { createContext, useContext } from 'react';

import type { ButtonProps } from '../../../types';

export type ContentPosition = 'left' | 'center' | 'right';

export type ButtonContextValue = {
  colorVariant: ButtonProps['colorVariant'];
  contentPosition: ContentPosition;
  isDisabled: boolean;
  setContentPosition: (position: ContentPosition) => void;
  size: ButtonProps['size'];
  sizingVariant: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  variant: ButtonProps['variant'];
};

export const ButtonContext = createContext<ButtonContextValue | null>(null);

export function useButtonContext() {
  const context = useContext(ButtonContext);

  if (!context) {
    throw new Error('Button compound components must be used within a Button component');
  }

  return context;
}

/**
 * Hook to optionally get button context (returns null if not within Button)
 */
export function useOptionalButtonContext() {
  return useContext(ButtonContext);
}
