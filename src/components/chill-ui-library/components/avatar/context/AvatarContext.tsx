import type { VariantProps } from 'tailwind-variants';

import { createContext, useContext, useMemo, PropsWithChildren } from 'react';

import type { avatarTv } from '../styles/Avatar.styles';

type AvatarContextType = {
  size?: VariantProps<typeof avatarTv>['size'];
};

const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

export function AvatarProvider({ children, size }: PropsWithChildren<AvatarContextType>) {
  const value = useMemo(() => ({ size }), [size]);

  return <AvatarContext.Provider value={value}>{children}</AvatarContext.Provider>;
}

export function useAvatarContext() {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error('useAvatarContext must be used within an AvatarProvider');
  }
  return context;
}
