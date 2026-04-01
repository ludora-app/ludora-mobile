import { getVersionInfo } from '../versionInfo';
import { IProvider, IVersionAndStoreUrl } from './types';

export type PlayStoreGetVersionOption = {
  country?: string;
  fetchOptions?: any;
  ignoreErrors?: boolean;
  packageName?: string;
};

class PlayStoreProvider implements IProvider {
  // eslint-disable-next-line class-methods-use-this
  async getVersion(option: PlayStoreGetVersionOption = {}): Promise<IVersionAndStoreUrl> {
    const opt = option;
    try {
      if (!opt.packageName) {
        opt.packageName = getVersionInfo().getPackageName();
      }
      if (!opt.country) {
        opt.country = await getVersionInfo().getCountry();
      }

      const fetchOptions = {
        headers: { 'sec-fetch-site': 'same-origin' },
        ...opt.fetchOptions,
      };

      const storeUrl = `https://play.google.com/store/apps/details?id=${opt.packageName}&hl=${opt.country}`;

      const response = await fetch(storeUrl, fetchOptions);
      const text = await response.text();

      const match = text.match(/Current Version.+?>([\d.-]+)<\/span>/);
      if (match) {
        return { storeUrl, version: match[1].trim() };
      }

      const matchNewLayout = text.match(/\[\[\["([\d-.]+?)"\]\]/);
      if (matchNewLayout) {
        return { storeUrl, version: matchNewLayout[1].trim() };
      }

      throw new Error(`Parse Error. ${opt.packageName} page doesn't seem to have latest app version info.`);
    } catch (e) {
      if (opt.ignoreErrors) {
        console.warn(e); // eslint-disable-line no-console
        return { storeUrl: '', version: '' };
      }
      throw e;
    }
  }
}

export default new PlayStoreProvider();
