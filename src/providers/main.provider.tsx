import { ReactNode } from 'react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import FontProvider from './font-provider';
import QueryProvider from './query.provider';

interface MainProviderProps {
  children: ReactNode;
}

export default function MainProvider({ children }: MainProviderProps) {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <QueryProvider>
          <KeyboardProvider navigationBarTranslucent>
            <BottomSheetModalProvider>
              <FontProvider>{children}</FontProvider>
            </BottomSheetModalProvider>
          </KeyboardProvider>
        </QueryProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
