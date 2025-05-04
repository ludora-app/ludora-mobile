import { ExpoRoot } from 'expo-router';
import { registerRootComponent } from 'expo';


export default function App() {
  const ctx = require.context('./src/app');
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);
