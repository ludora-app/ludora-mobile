export interface IVersionInfo {
  getPackageName: () => string;
  getCurrentVersion: () => string;
  getCountry: () => Promise<string>;
  getCurrentBuildNumber: () => number;
}

let VersionInfo: IVersionInfo | null = null;

export const setVersionInfo = (VI: IVersionInfo): void => {
  VersionInfo = VI;
};

export const getVersionInfo = (): IVersionInfo => {
  if (!VersionInfo) {
    throw new Error('VersionInfo is not set. Please call setVersionInfo first.');
  }
  return VersionInfo;
};
