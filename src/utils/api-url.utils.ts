const LOCALHOST_API_URL = `http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:2424`;
const TEST_API_URL = process.env.EXPO_PUBLIC_TEST_API_URL;
const STAGING_API_URL = process.env.EXPO_PUBLIC_STAGING_API_URL;
const PROD_API_URL = process.env.EXPO_PUBLIC_API_URL;

const env = process.env.EXPO_PUBLIC_API_ENV || 'test';

export const getApiUrl = () => {
  if (env === 'prod') {
    return PROD_API_URL;
  }
  if (env === 'localhost') {
    return LOCALHOST_API_URL;
  }
  if (env === 'staging') {
    return STAGING_API_URL;
  }
  return TEST_API_URL;
};
