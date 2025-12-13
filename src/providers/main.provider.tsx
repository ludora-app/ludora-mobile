import { ReactNode } from 'react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ChilluiDevTool } from '@/components/chill-ui-library';

import FontProvider from './font-provider';
import AuthProvider from './auth.provider';
import IconProvider from './icon.provider';
import QueryProvider from './query.provider';
import ToastProvider from './toast.provider';
import TolgeeProvider from './tolgee-provider';
import PlausibleProvider from './plausible.provider';
import WebsocketProvider from './websocket.provider';

interface MainProviderProps {
  children: ReactNode;
}

export default function MainProvider({ children }: MainProviderProps) {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <PlausibleProvider>
          <TolgeeProvider>
            <QueryProvider>
              <KeyboardProvider navigationBarTranslucent>
                <BottomSheetModalProvider>
                  <ChilluiDevTool className="border border-black bg-primary" />
                  <FontProvider>
                    <AuthProvider>
                      <WebsocketProvider>
                        <IconProvider>
                          <ToastProvider>{children}</ToastProvider>
                        </IconProvider>
                      </WebsocketProvider>
                    </AuthProvider>
                  </FontProvider>
                </BottomSheetModalProvider>
              </KeyboardProvider>
            </QueryProvider>
          </TolgeeProvider>
        </PlausibleProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
