import { ToastProvider as ToastProviderChillUI } from '@chillui/ui';
import { PropsWithChildren } from 'react';

export default function ToastProvider({ children }: PropsWithChildren) {
  return <ToastProviderChillUI>{children}</ToastProviderChillUI>;
}
