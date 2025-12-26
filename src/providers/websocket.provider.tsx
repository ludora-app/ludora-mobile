import { useWebsocketConnection } from '@/hooks/websocket.hook';

export default function WebsocketProvider() {
  useWebsocketConnection();

  return null;
}
