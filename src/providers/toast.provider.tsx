import { PropsWithChildren } from 'react';
import { ToastProvider as ToastProviderChillUI } from '@chillui/ui';

export default function ToastProvider({ children }: PropsWithChildren) {
  return <ToastProviderChillUI>{children}</ToastProviderChillUI>;
}
