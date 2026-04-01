const LOCALHOST_API_URL = `http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:2424`;
const DEV_API_URL = process.env.EXPO_PUBLIC_DEV_API_URL;
const PROD_API_URL = process.env.EXPO_PUBLIC_PROD_API_URL;

const env = process.env.EXPO_PUBLIC_API_ENV || ENVIRONMENTS.PRODUCTION;

export const getApiUrl = () => {
  if (env === ENVIRONMENTS.PRODUCTION) {
    return PROD_API_URL;
  }
  if (env === ENVIRONMENTS.LOCALHOST) {
    return LOCALHOST_API_URL;
  }
  if (env === ENVIRONMENTS.DEVELOPMENT || env === ENVIRONMENTS.PREVIEW) {
    return DEV_API_URL;
  }
  return PROD_API_URL;
};
