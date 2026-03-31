import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { BackHandler } from 'react-native';

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

export function useDisableBack(disabled = true) {
  useEffect(() => {
    if (disabled) {
      const backAction = () => true;
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

      return () => {
        backHandler.remove();
      };
    }

    return undefined;
  }, [disabled]);
}
