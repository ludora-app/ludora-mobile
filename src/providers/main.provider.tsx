import { PropsWithChildren } from 'react';
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
import PostHogProvider from './posthog.provider';
import DebuggerProvider from './debugger.provider';
import WebsocketProvider from './websocket.provider';
import PostHogIdentifierProvider from './poshog-identifier.provider';

export default function MainProvider({ children }: PropsWithChildren) {
  return (
    <GestureHandlerRootView>
      <PostHogProvider>
        <SafeAreaProvider>
          <TolgeeProvider>
            <QueryProvider>
              <AuthProvider />
              <PostHogIdentifierProvider />
              <WebsocketProvider />
              <KeyboardProvider navigationBarTranslucent>
                <BottomSheetModalProvider>
                  <ChilluiDevTool className="border border-black bg-primary" />
                  <DebuggerProvider />
                  <FontProvider>
                    <IconProvider>
                      <ToastProvider>{children}</ToastProvider>
                    </IconProvider>
                  </FontProvider>
                </BottomSheetModalProvider>
              </KeyboardProvider>
            </QueryProvider>
          </TolgeeProvider>
        </SafeAreaProvider>
      </PostHogProvider>
    </GestureHandlerRootView>
  );
}
