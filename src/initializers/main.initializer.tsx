import WebsocketInitializer from './websocket.initializer';
import SafeAreaInitializer from './safe-area-insets/safe-area.initializer';
import PostHogIdentifierInitializer from './poshog-identifier.initializer';

export default function MainInitializer() {
  return (
    <>
      <WebsocketInitializer />
      <SafeAreaInitializer />
      <PostHogIdentifierInitializer />
    </>
  );
}