// hooks/useErrorHandler.ts
import { useToast } from '@chillui/ui';
import { useTranslate } from '@tolgee/react';
import { HTTPError, TimeoutError } from 'ky';
import { usePostHog } from 'posthog-react-native';

import { AnalyticsEvent } from '@/constants/ANALYTICS_EVENTS';

export const useAnalytics = () => {
  const posthog = usePostHog();
  const { toast } = useToast();
  const { t } = useTranslate();

  const trackError = ({
    error,
    extra,
    showToast = true,
  }: {
    error?: any;
    extra?: Record<string, any>;
    showToast?: boolean;
  }) => {
    const { error: e, ...rest } = error;
    if (e instanceof HTTPError || e instanceof TimeoutError) {
      posthog.captureException(e, {
        ...rest,
        ...extra,
      });
    } else {
      posthog.captureException(error, {
        ...extra,
      });
    }
    if (showToast) {
      toast({
        message: t('common.error_generic'),
        variant: 'error',
      });
    }

    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log('Analytics error:', error);
    }
  };

  const trackEvent = ({ eventName, properties }: { eventName: AnalyticsEvent; properties?: Record<string, any> }) => {
    posthog.capture(eventName, {
      ...properties,
    });
  };

  return { trackError, trackEvent };
};
