import { Platform } from 'react-native';

import * as providers from './providers';
import { IProvider, IVersionAndStoreUrl } from './providers/types';

export type GetLatestVersionOption = {
  fetchOptions?: any;
  forceUpdate?: boolean;
  ignoreErrors?: boolean;
  provider?: string | IProvider;
};

const defaultOption: GetLatestVersionOption = {
  forceUpdate: false,
  ignoreErrors: true,
  provider: Platform.select({
    android: 'playStore',
    ios: 'appStore',
  }) as string,
};

let latestInfoCache: IVersionAndStoreUrl | null = null;

export async function getLatestVersionInfo(option: GetLatestVersionOption = {}): Promise<IVersionAndStoreUrl> {
  const opt = { ...defaultOption, ...option };

  try {
    if (!opt.forceUpdate && latestInfoCache !== null) {
      return latestInfoCache;
    }

    let result: IVersionAndStoreUrl;

    if (opt.provider && typeof opt.provider !== 'string' && (opt.provider as IProvider).getVersion) {
      result = await (opt.provider as IProvider).getVersion(opt);
    } else if (typeof opt.provider === 'string' && (providers as any)[opt.provider]) {
      result = await (providers as any)[opt.provider].getVersion(opt);
    } else {
      throw new Error(`Invalid provider: ${opt.provider}`);
    }

    latestInfoCache = result;
    return result;
  } catch (e) {
    if (opt.ignoreErrors) {
      console.warn(e); // eslint-disable-line no-console
      return { storeUrl: '', version: '' };
    }
    throw e;
  }
}

export async function getLatestVersion(option: GetLatestVersionOption = {}): Promise<string> {
  const result = await getLatestVersionInfo(option);
  return result.version;
}
