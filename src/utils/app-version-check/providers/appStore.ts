import { getVersionInfo } from '../versionInfo';
import { IProvider, IVersionAndStoreUrl } from './types';

export type AppStoreGetVersionOption = {
  country?: string;
  fetchOptions?: any;
  ignoreErrors?: boolean;
  packageName?: string;
};

class AppStoreProvider implements IProvider {
  // eslint-disable-next-line class-methods-use-this
  async getVersion(option: AppStoreGetVersionOption = {}): Promise<IVersionAndStoreUrl> {
    const opt = option;
    try {
      if (!opt.country) {
        opt.country = await getVersionInfo().getCountry();
      }
      if (!opt.packageName) {
        opt.packageName = getVersionInfo().getPackageName();
      }

      const { country, packageName } = opt;
      const countryCode = country ? `${country}/` : '';
      const dateNow = new Date().getTime();

      const response = await fetch(
        `https://itunes.apple.com/${countryCode}lookup?bundleId=${packageName}&date=${dateNow}`,
        opt.fetchOptions
      );
      const json = await response.json();

      if (json.resultCount) {
        const { trackId: appId, version } = json.results[0];
        const storeUrl = `itms-apps://apps.apple.com/${countryCode}app/id${appId}`;
        return {
          storeUrl,
          version,
        };
      }
      throw new Error('No info about this app.');
    } catch (e) {
      if (opt.ignoreErrors) {
        console.warn(e); // eslint-disable-line no-console
        return { storeUrl: '', version: '' };
      }
      throw e;
    }
  }
}

export default new AppStoreProvider();
