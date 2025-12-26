import { createContext, useContext } from 'react';

import type { ButtonProps } from '../../../types';

export type ChipContextValue = {
  colorVariant: ButtonProps['colorVariant'];
  isDisabled: boolean;
  size: ButtonProps['size'];
  sizingVariant: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  variant: ButtonProps['variant'];
};

export const ChipContext = createContext<ChipContextValue | null>(null);

export function useChipContext() {
  const context = useContext(ChipContext);

  if (!context) {
    throw new Error('Chip compound components must be used within a Chip component');
  }

  return context;
}
