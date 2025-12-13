import { ICONS } from '@/constants/ICONS';
import { IconProvider as IconProviderChillUI } from '@chillui/ui';
import React, { PropsWithChildren } from 'react';

export default function IconProvider({ children }: PropsWithChildren) {
  return <IconProviderChillUI icons={ICONS}>{children}</IconProviderChillUI>;
}
