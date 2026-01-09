import { createContext, useContext } from 'react';

import type { BadgeProps } from '../../../types/badge.types';

export interface BadgeContextType {
  side: BadgeProps['side'];
  size: BadgeProps['size'];
  variant: BadgeProps['variant'];
  position: BadgeProps['position'];
  colorVariant: BadgeProps['colorVariant'];
}

export const BadgeContext = createContext<BadgeContextType | undefined>(undefined);

export function useBadgeContext(): BadgeContextType {
  const context = useContext(BadgeContext);
  if (!context) {
    throw new Error('useBadgeContext must be used within a Badge component');
  }
  return context;
}
