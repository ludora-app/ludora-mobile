import { createContext, useContext } from 'react';

import type { ChipProps } from '../../../types';

export type ChipContextValue = {
  colorVariant: ChipProps['colorVariant'];
  isDisabled: boolean;
  size: ChipProps['size'];
  sizingVariant: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  variant: ChipProps['variant'];
};

export const ChipContext = createContext<ChipContextValue | null>(null);

export function useChipContext() {
  const context = useContext(ChipContext);

  if (!context) {
    throw new Error('Chip compound components must be used within a Chip component');
  }

  return context;
}
