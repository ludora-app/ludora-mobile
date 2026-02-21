import { useEffect, useState } from 'react';

import { pushNotificationService } from '@/services/push-notification.service';

/**
 * Hook to manage push notifications
 * Returns FCM token and notification state
 */
export function usePushNotifications() {
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
        console.error('Error initializing push notifications:', err);
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeNotifications();

    // Setup token refresh handler
    pushNotificationService.onTokenRefresh = (newToken: string) => {
      if (mounted) {
        setFcmToken(newToken);
        console.log('Token refreshed in hook:', newToken);
        // TODO: Call your API to update the token on the backend
      }
    };

    return () => {
      mounted = false;
      pushNotificationService.cleanup();
    };
  }, []);

  return {
    error,
    fcmToken,
    isLoading,
    refreshToken: () => pushNotificationService.getFCMToken(),
  };
}
