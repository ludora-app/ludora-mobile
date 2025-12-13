import ky from 'ky';
import * as SecureStore from 'expo-secure-store';

const kyApi = ky.create({
  hooks: {
    beforeRequest: [
      async request => {
        const accessToken = await SecureStore.getItemAsync('access_token');
        if (accessToken) {
          request.headers.set('Authorization', `Bearer ${accessToken}`);
        }
      },
    ],
  },
  prefixUrl: process.env.EXPO_PUBLIC_DEV_API_URL,
});

export { kyApi };
