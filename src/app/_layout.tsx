import { MainProvider } from "@/providers/main.provider";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import "../styles/global.css";

export default function RootLayout() {
  return (
    <MainProvider>
      <SafeAreaView className="flex-1">
        <RootLayoutNav />
      </SafeAreaView>
    </MainProvider>
  );
}

const RootLayoutNav = () => {
  return (
    <Stack
      screenOptions={{
        animation: "fade",
        contentStyle: { backgroundColor: "#fff" },
        headerShown: false,
      }}
      initialRouteName="(root)"
    >
      <Stack.Screen name="(root)" />
    </Stack>
  );
};
