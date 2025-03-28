import { ReactNode } from "react";
import { QueryProvider } from "./query.provider";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardProvider } from "react-native-keyboard-controller";

interface MainProviderProps {
  children: ReactNode;
}

export const MainProvider = ({ children }: MainProviderProps) => {
  return (
    <SafeAreaProvider>
      <QueryProvider>
        <KeyboardProvider navigationBarTranslucent={true}>
          {children}
        </KeyboardProvider>
      </QueryProvider>
    </SafeAreaProvider>
  );
};
