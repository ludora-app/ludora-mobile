import Constants from 'expo-constants';
import { Platform } from 'react-native';
import * as Localization from 'expo-localization';

const manifest = Constants.expoConfig || (Constants as any).manifest2?.extra?.expoClient;
const {
  android: { package: androidPackageName = '' } = {},
  ios: { bundleIdentifier = '' } = {},
  version = '',
} = manifest || {};

const locale = Localization.getLocales()[0];
const country = locale?.regionCode?.toLowerCase() || 'fr';

const packageName = Platform.select({
  android: androidPackageName,
  ios: bundleIdentifier,
});

const currentBuildNumber = Platform.select({
  android: manifest?.android?.versionCode || 0,
  ios: manifest?.ios?.buildNumber || '0',
});

export default {
  getCountry: (): Promise<string> => Promise.resolve(country),
  getCurrentBuildNumber: (): number => Number(currentBuildNumber),
  getCurrentVersion: (): string => version,
  getPackageName: (): string => packageName || '',
};
