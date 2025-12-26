import ky from 'ky';
import * as SecureStore from 'expo-secure-store';

import { useAuthStore } from '@/stores/auth.store';

import { POST as refreshTokenPost } from './queries/refresh-token.query';

let refreshPromise: Promise<string | null> | null = null;

const LOCAL_API_URL = `http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:2424`;
const REMOTE_API_URL = process.env.EXPO_PUBLIC_DEV_API_URL;

const handleLogout = async () => {
  refreshPromise = null;
  await SecureStore.deleteItemAsync('access_token');
  await SecureStore.deleteItemAsync('refresh_token');
  useAuthStore.getState().setIsAuthenticated(false);
};

async function handleRefreshToken(refreshToken: string): Promise<string | null> {
  try {
    const response = await refreshTokenPost(refreshToken);

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    await SecureStore.setItemAsync('access_token', accessToken);
    await SecureStore.setItemAsync('refresh_token', newRefreshToken);

    return accessToken;
  } catch {
    await handleLogout();
    return null;
  }
}

const kyApi = ky.create({
  hooks: {
    afterResponse: [
      async (request, _options, response) => {
        const isRefreshRequest = request.url.includes('/auth-b2c/refresh-token');
        if (response.status === 401 && !isRefreshRequest) {
          const refreshToken = await SecureStore.getItemAsync('refresh_token');

          if (!refreshToken) {
            await handleLogout();
            return response;
          }

          try {
            if (!refreshPromise) {
              refreshPromise = handleRefreshToken(refreshToken);
            }

            const newToken = await refreshPromise;
            refreshPromise = null;

            if (newToken) {
              request.headers.set('Authorization', `Bearer ${newToken}`);
              return ky(request);
            }
          } catch {
            refreshPromise = null;
          }
        }
        return response;
      },
    ],
    beforeRequest: [
      async request => {
        const token = await SecureStore.getItemAsync('access_token');
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
  },
  prefixUrl: LOCAL_API_URL,
  retry: {
    limit: 3,
    methods: ['get', 'put', 'delete', 'patch'],
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
  },
});

export { kyApi };
