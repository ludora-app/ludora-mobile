import ky from 'ky';
import * as SecureStore from 'expo-secure-store';

const LOCAL_API_URL = `http://${process.env.EXPO_PUBLIC_MY_IP}:2424`;
const REMOTE_API_URL = process.env.EXPO_PUBLIC_DEV_API_URL;

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
  prefixUrl: LOCAL_API_URL,
});

export { kyApi };
