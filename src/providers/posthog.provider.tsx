import { PropsWithChildren } from 'react';
import { PostHogProvider as PostHogNativeProvider } from 'posthog-react-native';

import { ENVIRONMENTS } from '@/constants/environments.constants';

const environment = process.env.EXPO_PUBLIC_ENV || ENVIRONMENTS.PRODUCTION;

export default function PostHogProvider({ children }: PropsWithChildren) {
  const isDisabled = environment === ENVIRONMENTS.LOCALHOST;

  const isProd = environment === ENVIRONMENTS.PRODUCTION;

  return (
    <PostHogNativeProvider
      apiKey={process.env.EXPO_PUBLIC_POSTHOG_API_KEY}
      options={{
        disabled: isDisabled,
        enableSessionReplay: isProd,
        errorTracking: {
          autocapture: {
            console: ['error', 'warn'],
            uncaughtExceptions: true,
            unhandledRejections: true,
          },
        },
        host: process.env.EXPO_PUBLIC_POSTHOG_HOST,
        sessionReplayConfig: {
          captureNetworkTelemetry: isProd,
        },
      }}
      autocapture={{
        captureScreens: false,
        captureTouches: false,
      }}
    >
      {children}
    </PostHogNativeProvider>
  );
}
