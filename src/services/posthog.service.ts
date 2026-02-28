import PostHog from 'posthog-react-native';

const environment = process.env.EXPO_PUBLIC_ENV || 'production';

const posthogApiKey = process.env.EXPO_PUBLIC_POSTHOG_API_KEY;

export const posthog = new PostHog(posthogApiKey, {
  disabled: environment === 'localhost',
  enableSessionReplay: true,
  host: process.env.EXPO_PUBLIC_POSTHOG_HOST,
});
