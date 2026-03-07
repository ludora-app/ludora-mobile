const LOCALHOST_API_URL = `http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:2424`;
const DEV_API_URL = process.env.EXPO_PUBLIC_DEV_API_URL;
const PROD_API_URL = process.env.EXPO_PUBLIC_PROD_API_URL;

const env = process.env.EXPO_PUBLIC_API_ENV || 'production';

export const getApiUrl = () => {
  if (env === 'production') {
    return PROD_API_URL;
  }
  if (env === 'localhost') {
    return LOCALHOST_API_URL;
  }
  if (env === 'development' || env === 'preview') {
    return DEV_API_URL;
  }
  return PROD_API_URL;
};
