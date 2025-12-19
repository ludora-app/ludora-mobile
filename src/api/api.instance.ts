import ky from 'ky';
import * as SecureStore from 'expo-secure-store';

let tempToken: string | null = null;

export const setTempToken = (token: string) => {
  tempToken = token;
};
const LOCAL_API_URL = `http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:2424`;
const REMOTE_API_URL = process.env.EXPO_PUBLIC_DEV_API_URL;

const kyApi = ky.create({
  hooks: {
    beforeRequest: [
      async request => {
        const token = tempToken || (await SecureStore.getItemAsync('access_token'));
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
  },
  prefixUrl: LOCAL_API_URL,
});

export { kyApi };
