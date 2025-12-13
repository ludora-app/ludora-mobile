import { ReactNode } from 'react';

import { useWebsocketConnection } from '@/hooks/websocket.hook';

interface WebsocketProviderProps {
  children: ReactNode;
}

export default function WebsocketProvider({ children }: WebsocketProviderProps) {
  useWebsocketConnection();

  return children;
}
