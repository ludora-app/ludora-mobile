import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { useAuthStore } from '@/stores/auth.store';
import { resetCaches } from '@/utils/reset-caches.utils';
import { useSignOut as useGoogleSignOut } from '@/api/hooks/auth-google.hook';

import { useSecureStorageState } from './secure-storage-state.hook';

/**
 * Hook custom pour la gestion de l'authentification et du token
 */
type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export function useAuthHelpers() {
  const queryClient = useQueryClient();
  const { mutateAsync: signOut } = useGoogleSignOut();
  const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated);
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
    setAccessTokenStorage(null);
    setRefreshTokenStorage(null);
    setIsAuthenticated(false);
    resetCaches();
    await signOut();
    queryClient.clear();
  }, [queryClient, signOut, setAccessTokenStorage, setRefreshTokenStorage, setIsAuthenticated]);

  return { login, logout };
}
