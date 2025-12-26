import { useEffect } from 'react';
import { useAuthB2CVerifyToken } from '@generatedApi/auth-b2-c/auth-b2-c.api';

import { useAuthStore } from '@/stores/auth.store';
import { useSecureStorageState } from '@/hooks/secure-storage-state.hook';

export default function AuthProvider() {
  const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated);
  const setIsLoading = useAuthStore(state => state.setIsLoading);

  const [[isLoadingToken, accessTokenStorage]] = useSecureStorageState('access_token');

  const {
    data: dataVerifyToken,
    error: errorVerifyToken,
    isFetching: isFetchingVerifyToken,
  } = useAuthB2CVerifyToken({
    query: {
      enabled: !!accessTokenStorage && !isLoadingToken,
    },
  });

  useEffect(() => {
    if (isFetchingVerifyToken) {
      setIsLoading(true);
    } else {
      const isValid = errorVerifyToken ? false : (dataVerifyToken?.data.isValid ?? false);
      setIsAuthenticated(isValid);
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    }
  }, [isFetchingVerifyToken, isLoadingToken, dataVerifyToken, errorVerifyToken, setIsLoading, setIsAuthenticated]);

  return null;
}
