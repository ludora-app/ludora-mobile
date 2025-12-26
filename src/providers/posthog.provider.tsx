import { PropsWithChildren } from 'react';
import { PostHogProvider as PostHogNativeProvider } from 'posthog-react-native';

export default function PostHogProvider({ children }: PropsWithChildren) {
  return (
    <PostHogNativeProvider
      apiKey={process.env.EXPO_PUBLIC_POSTHOG_API_KEY}
      options={{
        disabled: true,
        enableSessionReplay: true,
        errorTracking: {
          autocapture: {
            console: ['error', 'warn'],
            uncaughtExceptions: true,
            unhandledRejections: true,
          },
        },
        host: process.env.EXPO_PUBLIC_POSTHOG_HOST,
        sessionReplayConfig: {
          captureNetworkTelemetry: true,
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
