import { PropsWithChildren } from 'react';
import { IconProvider as IconProviderChillUI } from '@chillui/ui';

import { ICONS } from '@/constants/icons.constants';

export default function IconProvider({ children }: PropsWithChildren) {
  return <IconProviderChillUI icons={ICONS}>{children}</IconProviderChillUI>;
}
