import { useEffect } from 'react';
import { useRouter } from 'expo-router';

import dayjs from '@/lib/dayjs';
import ROUTES from '@/constants/routes.constants';
import VersionCheck from '@/utils/app-version-check';
import { mmkvStorage } from '@/utils/mmkv-storage.utils';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { RootStackParamList } from '@/types/routes-params.types';
import { MMKV_STORAGE_KEY } from '@/constants/mmkv-keys.constants';

const devModeMock = {
  currentVersion: '1.0.0',
  isNeeded: false,
  latestVersion: '1.1.0',
  storeUrl: 'https://play.google.com/store/apps/details?id=com.zzkko',
};

type AppCheckScreenParams = RootStackParamList[typeof ROUTES.APP_CHECK.INDEX];

export default function CheckAppVersionInitializer() {
  const { trackError } = useAnalytics();
  const router = useRouter();
  const checkForUpdate = async () => {
    try {
      const res = __DEV__ ? devModeMock : await VersionCheck.needUpdate();

      if (res && res.isNeeded) {
        const current = res.currentVersion.split('.').map(Number);
        const latest = res.latestVersion.split('.').map(Number);

        const currentMajor = current[0];
        const latestMajor = latest[0];

        // 1. MAJOR CASE (ex: 1.x.x -> 2.x.x) : UPDATE REQUIRED
        if (latestMajor > currentMajor) {
          const params: AppCheckScreenParams = {
            content: 'check-app-version.required_content',
            storeUrl: res.storeUrl,
            title: 'check-app-version.required_title',
          };
          router.navigate({
            params,
            pathname: ROUTES.APP_CHECK.INDEX,
          });
          return;
        }

        // 2. OPTIONAL CASE (ex: 1.x.x -> 1.y.y) : UPDATE OPTIONAL
        const lastRefusal = mmkvStorage.getNumber(MMKV_STORAGE_KEY.UPDATE_REFUSAL_TIMESTAMP);
        if (lastRefusal && dayjs().diff(dayjs(lastRefusal), 'hour') < 24) {
          return;
        }

        const params: AppCheckScreenParams = {
          content: 'check-app-version.optional_content',
          hasLaterButton: 'true',
          storeUrl: res.storeUrl,
          title: 'check-app-version.optional_title',
        };

        router.navigate({
          params,
          pathname: ROUTES.APP_CHECK.INDEX,
        });
      }
    } catch (error) {
      trackError({ error });
    }
  };

  useEffect(() => {
    checkForUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
