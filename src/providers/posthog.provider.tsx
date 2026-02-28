import { PropsWithChildren } from 'react';
import { PostHogProvider as PostHogNativeProvider } from 'posthog-react-native';

const environment = process.env.EXPO_PUBLIC_ENV || 'production';

export default function PostHogProvider({ children }: PropsWithChildren) {

  const isDisabled = environment === "localhost"


  return (
    <PostHogNativeProvider
      apiKey={process.env.EXPO_PUBLIC_POSTHOG_API_KEY}
      options={{
        disabled: isDisabled,
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
