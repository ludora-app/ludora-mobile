import { useWebsocketConnection } from '@/hooks/web-sockets/web-sockets.hook';

export default function WebsocketInitializer() {
  useWebsocketConnection();

  return null;
}
