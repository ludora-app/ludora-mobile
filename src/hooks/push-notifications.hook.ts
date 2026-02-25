import { useEffect, useState } from 'react';

import { pushNotificationService } from '@/services/push-notification.service';

import { useAnalytics } from './analytics-trackers.hook';

/**
 * Hook to manage push notifications
 * Returns FCM token and notification state
 */
export function usePushNotifications() {
  const { trackError } = useAnalytics();
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const initializeNotifications = async () => {
      try {
        setIsLoading(true);
        const token = await pushNotificationService.initialize();

        if (mounted) {
          setFcmToken(token);
          setError(null);
        }
      } catch (err) {
        const errObj = err instanceof Error ? err : new Error('Unknown error');
        if (mounted) {
          setError(errObj);
        }
        trackError({ error: err, showToast: false });
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeNotifications();

    // Setup token refresh handler (initializer re-registers when fcmToken changes)
    pushNotificationService.onTokenRefresh = (newToken: string) => {
      if (mounted) {
        setFcmToken(newToken);
      }
    };

    return () => {
      mounted = false;
      pushNotificationService.cleanup();
    };
  }, [trackError]);

  return {
    error,
    fcmToken,
    isLoading,
    refreshToken: () => pushNotificationService.getFCMToken(),
  };
}
