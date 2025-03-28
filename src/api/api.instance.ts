import ky from "ky";
import * as SecureStore from "expo-secure-store";

const api = ky.create({
  prefixUrl: `http://${process.env["EXPO_PUBLIC_IP_ADDRESS"]}:${process.env["EXPO_PUBLIC_BACKEND_PORT"]}`,
});

const authApi = ky.create({
  prefixUrl: `http://${process.env["EXPO_PUBLIC_IP_ADDRESS"]}:${process.env["EXPO_PUBLIC_BACKEND_PORT"]}`,
  hooks: {
    beforeRequest: [
      async (request) => {
        const accessToken = await SecureStore.getItemAsync("access_token");
        if (accessToken) {
          request.headers.set("Authorization", `Bearer ${accessToken}`);
        }
      },
    ],
  },
});

export { api, authApi };
