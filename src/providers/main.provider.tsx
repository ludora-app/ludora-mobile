import { PropsWithChildren } from 'react';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { initialWindowMetrics, SafeAreaProvider as NativeSafeAreaProvider } from 'react-native-safe-area-context';

import IconProvider from './icon.provider';
import QueryProvider from './query.provider';
import ToastProvider from './toast.provider';
import TolgeeProvider from './tolgee-provider';
import PostHogProvider from './posthog.provider';
import DevToolsProvider from './dev-tools.provider';

export default function MainProvider({ children }: PropsWithChildren) {


  return (
    <GestureHandlerRootView>
      <PostHogProvider>
        <NativeSafeAreaProvider initialMetrics={initialWindowMetrics}>
          <TolgeeProvider>
            <QueryProvider>
              <KeyboardProvider>
                <DevToolsProvider />
                <IconProvider>
                  <ToastProvider>{children}</ToastProvider>
                </IconProvider>
              </KeyboardProvider>
            </QueryProvider>
          </TolgeeProvider>
        </NativeSafeAreaProvider>
      </PostHogProvider>
    </GestureHandlerRootView>
  );
}
