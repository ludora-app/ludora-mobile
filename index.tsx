import { ExpoRoot } from 'expo-router';
import { registerRootComponent } from 'expo';

// Must be exported or Fast Refresh won't update the context
export default function App() {
  const ctx = require.context('./src/app');
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);
