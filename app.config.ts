import { ConfigContext, ExpoConfig } from 'expo/config';

import packageJson from './package.json';

export default ({ config }: ConfigContext): ExpoConfig => {
  const env = process.env.EXPO_PUBLIC_ENV || 'production';

  const isProd = env === 'production';
  const isPreview = env === 'preview';
  const isLocalHost = env === 'localhost' || env === 'development';

  let name = 'Ludora';
  let bundleIdentifier = 'com.ludora';

  if (isPreview) {
    name = 'Ludora Preview';
    bundleIdentifier = 'com.ludora.preview';
  } else if (isLocalHost) {
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
    plugins: [
      ...config.plugins,
      ...(process.env.EXPO_PUBLIC_GOOGLE_IOS_URL_SCHEMA
        ? [
            [
              '@react-native-google-signin/google-signin',
              { iosUrlScheme: process.env.EXPO_PUBLIC_GOOGLE_IOS_URL_SCHEMA },
            ] as [string, any],
          ]
        : []),
    ],
    slug: 'ludora',
    version: packageJson.version,
  };
};
