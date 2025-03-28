import { ExpoRoot } from "expo-router";
import { StatusBar, Text } from "react-native";
import { registerRootComponent } from "expo";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Must be exported or Fast Refresh won't update the context
export function App() {
  const ctx = require.context("./src/app");
  return (
    <SafeAreaProvider>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <ExpoRoot context={ctx} />
    </SafeAreaProvider>
  );
}

registerRootComponent(App);
