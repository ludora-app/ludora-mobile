import { IProvider } from './providers/types';
import { getVersionInfo } from './versionInfo';
import { getLatestVersionInfo } from './getLatestVersion';

export type NeedUpdateOption = {
  currentVersion?: string;
  latestVersion?: string;
  depth?: number;
  ignoreErrors?: boolean;
  provider?: string | IProvider;
};

export type NeedUpdateResult = {
  currentVersion: string;
  isNeeded: boolean;
  latestVersion: string;
  storeUrl: string;
};

const getVersionWithDepth = (version: string, depth: number): string => {
  const parts = version.split('.').slice(0, depth);
  while (parts.length < 3) {
    parts.push('0');
  }
  return parts.join('.');
};

const isLatestGreaterThanCurrent = (latest: string, current: string): boolean => {
  const latestParts = latest.split('.').map(Number);
  const currentParts = current.split('.').map(Number);

  for (let i = 0; i < Math.max(latestParts.length, currentParts.length); i += 1) {
    const v1 = latestParts[i] || 0;
    const v2 = currentParts[i] || 0;
    if (v1 > v2) return true;
    if (v1 < v2) return false;
  }
  return false;
};

export default async function needUpdate(option: NeedUpdateOption = {}): Promise<NeedUpdateResult> {
  const opt = {
    depth: Infinity,
    ignoreErrors: true,
    ...option,
  };

  try {
    const currentVersion = opt.currentVersion || getVersionInfo().getCurrentVersion();
    let { latestVersion } = opt;
    let storeUrl = '';

    if (!latestVersion) {
      const result = await getLatestVersionInfo(opt as any);
      latestVersion = result.version;
      storeUrl = result.storeUrl;
    }

    const currentVersionWithDepth = getVersionWithDepth(currentVersion, opt.depth);
    const latestVersionWithDepth = getVersionWithDepth(latestVersion, opt.depth);

    const isNeeded = isLatestGreaterThanCurrent(latestVersionWithDepth, currentVersionWithDepth);

    return {
      currentVersion,
      isNeeded,
      latestVersion: latestVersion || '',
      storeUrl,
    };
  } catch (e) {
    if (opt.ignoreErrors) {
      console.warn(e); // eslint-disable-line no-console
      return {
        currentVersion: opt.currentVersion || '',
        isNeeded: false,
        latestVersion: opt.latestVersion || '',
        storeUrl: '',
      };
    }
    throw e;
  }
}
