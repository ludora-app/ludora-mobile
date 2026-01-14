import { ExpoRoot } from 'expo-router';
import { registerRootComponent } from 'expo';

// Import Firebase messaging background handler
import './firebase-messaging-handler';

export default function App() {
  const ctx = require.context('./src/app');
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);
