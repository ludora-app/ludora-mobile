import needUpdate from './needUpdate';
import { getLatestVersion } from './getLatestVersion';
import { setVersionInfo, type IVersionInfo } from './versionInfo';
import getStoreUrl, { getAppStoreUrl, getPlayStoreUrl } from './getStoreUrl';

export interface ReactNativeVersionCheck extends IVersionInfo {
  needUpdate: typeof needUpdate;
  getStoreUrl: typeof getStoreUrl;
  getAppStoreUrl: typeof getAppStoreUrl;
  getPlayStoreUrl: typeof getPlayStoreUrl;
  getLatestVersion: typeof getLatestVersion;
}

export default (VersionInfoObject: IVersionInfo): ReactNativeVersionCheck => {
  setVersionInfo(VersionInfoObject);

  return {
    getAppStoreUrl,
    getCountry: VersionInfoObject.getCountry,
    getCurrentBuildNumber: VersionInfoObject.getCurrentBuildNumber,
    getCurrentVersion: VersionInfoObject.getCurrentVersion,

    getLatestVersion,
    getPackageName: VersionInfoObject.getPackageName,
    getPlayStoreUrl,
    getStoreUrl,

    needUpdate,
  };
};
