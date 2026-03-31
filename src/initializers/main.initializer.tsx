import WebsocketInitializer from './websocket.initializer';
import CheckAppVersionInitializer from './check-app-version.initializer';
import PostHogIdentifierInitializer from './poshog-identifier.initializer';
import SafeAreaInitializer from './safe-area-insets/safe-area.initializer';

export default function MainInitializer() {
  return (
    <>
      <WebsocketInitializer />
      <SafeAreaInitializer />
      <PostHogIdentifierInitializer />
      <CheckAppVersionInitializer />
    </>
  );
}
