import { useRouter } from 'expo-router';

import ROUTES from '@/constants/routes.constants';

export const useAppNavigation = () => {
  const router = useRouter();

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.dismissTo({ pathname: ROUTES.HOME.INDEX });
    }
  };

  return { goBack };
};
