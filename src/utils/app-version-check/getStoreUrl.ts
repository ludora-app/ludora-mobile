import { Platform } from 'react-native';

import { getVersionInfo } from './versionInfo';

export type GetAppStoreUrlOption = {
  appID?: string;
  country?: string;
  ignoreErrors?: boolean;
};

export type GetPlayStoreUrlOption = {
  ignoreErrors?: boolean;
  packageName?: string;
};

export type GetStoreUrlOption = GetAppStoreUrlOption & GetPlayStoreUrlOption;

export async function getAppStoreUrl(option: GetAppStoreUrlOption = {}): Promise<string> {
  const opt = option;
  try {
    if (!opt.appID) {
      throw new Error('appID is empty.');
    }

    const country = opt.country || (await getVersionInfo().getCountry());
    const countryCode = country ? `${country}/` : '';

    return `itms-apps://apps.apple.com/${countryCode}app/id${opt.appID}`;
  } catch (e) {
    if (opt.ignoreErrors) {
      console.warn(e); // eslint-disable-line no-console
      return '';
    }
    throw e;
  }
}

export async function getPlayStoreUrl(option: GetPlayStoreUrlOption = {}): Promise<string> {
  const opt = option || {};
  try {
    const packageName = opt.packageName || getVersionInfo().getPackageName();
    return `https://play.google.com/store/apps/details?id=${packageName}`;
  } catch (e) {
    if (opt.ignoreErrors) {
      console.warn(e); // eslint-disable-line no-console
      return '';
    }
    throw e;
  }
}

export default async function getStoreUrl(option: GetStoreUrlOption): Promise<string> {
  if (Platform.OS === 'android') {
    return getPlayStoreUrl(option);
  }
  return getAppStoreUrl(option);
}
