// hooks/useErrorHandler.ts
import { useEffect } from 'react';
import { useToast } from '@chillui/ui';
import { useTranslate } from '@tolgee/react';
import { HTTPError, TimeoutError } from 'ky';
import { usePostHog } from 'posthog-react-native';

import { AnalyticsEvent, AnalyticsEventWithDataType } from '@/constants/analytics-events.constants';

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

  const trackEvent = <T extends AnalyticsEvent>({ data, eventName }: AnalyticsEventWithDataType<T>) => {
    posthog.capture(eventName, data);
  };

  return { trackError, trackEvent };
};

export const useGetMethodErrorTracking = ({
  error,
  extra,
  isError,
  showToast = false,
}: {
  error?: any;
  isError: boolean;
  extra?: Record<string, any>;
  showToast?: boolean;
}) => {
  const { trackError } = useAnalytics();

  useEffect(() => {
    if (isError && error) {
      trackError({
        error,
        extra,
        showToast,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, error]);
};
