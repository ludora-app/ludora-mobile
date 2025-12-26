import { useEffect } from 'react';
import { BackHandler } from 'react-native';

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
