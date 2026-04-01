import PostHog from 'posthog-react-native';

import { ENVIRONMENTS } from '@/constants/environments.constants';

const environment = process.env.EXPO_PUBLIC_ENV || ENVIRONMENTS.PRODUCTION;

const posthogApiKey = process.env.EXPO_PUBLIC_POSTHOG_API_KEY;

const isDisabled = environment === ENVIRONMENTS.LOCALHOST;
const isProd = environment === ENVIRONMENTS.PRODUCTION;

export const posthog = new PostHog(posthogApiKey, {
  disabled: isDisabled,
  enableSessionReplay: isProd,
  host: process.env.EXPO_PUBLIC_POSTHOG_HOST,
});
