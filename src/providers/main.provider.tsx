import { ReactNode } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import FontProvider from './font-provider';
import QueryProvider from './query.provider';

interface MainProviderProps {
  children: ReactNode;
}

export default function MainProvider({ children }: MainProviderProps) {
  return (
    <SafeAreaProvider>
      <QueryProvider>
        <KeyboardProvider navigationBarTranslucent>
          <FontProvider>{children}</FontProvider>
        </KeyboardProvider>
      </QueryProvider>
    </SafeAreaProvider>
  );
}
