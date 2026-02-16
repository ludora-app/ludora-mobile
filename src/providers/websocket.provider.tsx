import { useWebsocketConnection } from '@/hooks/web-sockets/web-sockets.hook';

export default function WebsocketProvider() {
  useWebsocketConnection();

  return null;
}
