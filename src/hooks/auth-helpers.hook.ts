import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { useAuthStore } from '@/stores/auth.store';
import { resetCaches } from '@/utils/reset-caches.utils';
import { useUnRegisterDevice } from '@/queries/unRegister-device.query';
import { useOnBoardingStatusStore } from '@/stores/on-boarding-status.store';
import { useSignOut as useGoogleSignOut } from '@/api/hooks/auth-google.hook';
import { pushNotificationService } from '@/services/push-notification.service';

import { useAnalytics } from './analytics-trackers.hook';
import { useSecureStorageState } from './secure-storage-state.hook';

/**
 * Hook custom pour la gestion de l'authentification et du token
 */
type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export function useAuthHelpers() {
  const { trackError } = useAnalytics();
  const queryClient = useQueryClient();
  const { mutateAsync: signOut } = useGoogleSignOut();
  const { mutateAsync: unregisterDeviceAsync } = useUnRegisterDevice();
  const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated);
  const clearOnBoarding = useOnBoardingStatusStore(state => state.clear);
  const [, setAccessTokenStorage] = useSecureStorageState('access_token');
  const [, setRefreshTokenStorage] = useSecureStorageState('refresh_token');

  const login = useCallback(
    async (tokens: AuthTokens) => {
      setAccessTokenStorage(tokens.accessToken);
      setRefreshTokenStorage(tokens.refreshToken);
      setIsAuthenticated(true);
    },
    [setAccessTokenStorage, setRefreshTokenStorage, setIsAuthenticated],
  );

  const logout = useCallback(async () => {
    setIsAuthenticated(false);
    clearOnBoarding();
    resetCaches();
    queryClient.clear();

    try {
      const fcmToken = await pushNotificationService.getFCMToken();
      if (fcmToken) {
        await unregisterDeviceAsync({ fcmToken });
      }
    } catch (error) {
      trackError({ error, showToast: false });
    }

    setAccessTokenStorage(null);
    setRefreshTokenStorage(null);

    try {
      await signOut();
      await pushNotificationService.deleteToken();
    } catch (error) {
      trackError({ error, showToast: false });
    }
  }, [
    clearOnBoarding,
    queryClient,
    signOut,
    setAccessTokenStorage,
    setRefreshTokenStorage,
    setIsAuthenticated,
    unregisterDeviceAsync,
    trackError,
  ]);

  return { login, logout };
}
