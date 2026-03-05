import { ConfigContext, ExpoConfig } from 'expo/config';

import packageJson from './package.json';

export default ({ config }: ConfigContext): ExpoConfig => {
  const env = process.env.EXPO_PUBLIC_ENV || 'development';

  const isProd = env === 'production';
  const isPreview = env === 'preview';

  let name = 'Ludora';
  let bundleIdentifier = 'com.ludora';

  if (isPreview) {
    name = 'Ludora Preview';
    bundleIdentifier = 'com.ludora.preview';
  } else if (!isProd) {
    name = 'Ludora Dev';
    bundleIdentifier = 'com.ludora.dev';
  }

  const googleServicesAndroid = isProd ? './google-services.json' : './dev.google-services.json';
  const googleServicesIos = isProd ? './GoogleService-Info.plist' : './dev.GoogleService-Info.plist';

  return {
    ...config,
    android: {
      ...config.android,
      googleServicesFile: googleServicesAndroid,
      package: bundleIdentifier,
    },
    ios: {
      ...config.ios,
      bundleIdentifier,
      googleServicesFile: googleServicesIos,
    },
    name,
    slug: 'ludora',
    version: packageJson.version,
  };
};
